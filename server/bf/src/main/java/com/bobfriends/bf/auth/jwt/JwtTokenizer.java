package com.bobfriends.bf.auth.jwt;

import com.bobfriends.bf.exception.BusinessLogicException;
import com.bobfriends.bf.member.entity.Member;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.io.Encoders;
import io.jsonwebtoken.security.Keys;
import lombok.Getter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Component
public class JwtTokenizer {
    @Getter
    @Value("${jwt.key.secret}")
    private String secretKey;

    @Getter
    @Value("${jwt.access-token-expiration-minutes}")
    private int accessTokenExpirationMinutes;

    @Getter
    @Value("${jwt.refresh-token-expiration-minutes}")
    private int refreshTokenExpirationMinutes;

    /** Secret Key 를 Base64 형식의 문자열로 인코딩 **/
    public String encodeBase64SecretKey(String secretKey) {
        return Encoders.BASE64.encode(secretKey.getBytes(StandardCharsets.UTF_8));
    }

    /** 인증된 사용자에게 JWT 를 최초로 발급해주기 위한 JWT 생성 메서드 **/
    public String generateAccessToken(Map<String, Object> claims,
                                      String subject,
                                      Date expiration,
                                      String base64EncodedSecretKey) {

        Key key = getKeyFromBase64EncodedKey(base64EncodedSecretKey);

        return Jwts.builder()
                .setClaims(claims)
                .setSubject(subject)
                .setIssuedAt(Calendar.getInstance().getTime())
                .setExpiration(expiration)
                .signWith(key)
                .compact();
    }


    /** Access Token이 만료되었을 경우 Access Token을 새로 생성할 수 있게 해주는 Refresh Token 생성 **/
    public String generateRefreshToken(String subject, Date expiration, String base64EncodedSecretKey) {

        Key key = getKeyFromBase64EncodedKey(base64EncodedSecretKey);

        return Jwts.builder()
                .setSubject(subject)
                .setIssuedAt(Calendar.getInstance().getTime())
                .setExpiration(expiration)
                .signWith(key)
                .compact();
    }

    /** Jws는 JWT 에 포함된 Signature를 검증함으로써 JWT의 위/변조 여부 확인 **/
    public Jws<Claims> getClaims(String jws, String base64EncodedSecretKey) {

        Key key = getKeyFromBase64EncodedKey(base64EncodedSecretKey);

        Jws<Claims> claims = Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(jws);

        return claims;
    }

    /** token으로 memberId 추출 메서드 **/
    public long getMemberIdFromToken(String token, String base64EncodedSecretKey){
        Key key = getKeyFromBase64EncodedKey(base64EncodedSecretKey);

        String jwtToken = token.substring("Bearer ".length());

        Jws<Claims> claimsJws = Jwts.parser().setSigningKey(key).parseClaimsJws(jwtToken);

        Claims claims = claimsJws.getBody();

        Long memberId = claims.get("memberId", Long.class);

        return memberId;
    }

    /** 단순히 검증만 하는 용도로 쓰일 경우 **/
    public void verifySignature(String jws, String base64EncodedSecretKey) {

        Key key = getKeyFromBase64EncodedKey(base64EncodedSecretKey);

        Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(jws);
    }

    public Jws<Claims> verifySignature(String jws){

        try {
            //Key secretKey = getKeyFromBase64EncodedKey(getSecretKey());
            return Jwts.parserBuilder()
                    .setSigningKey(secretKey.getBytes())
                    .build()
                    .parseClaimsJws(jws);
        } catch (ExpiredJwtException exception) {
            //throw new BusinessLogicException(ExceptionCode.JWT_TOKEN_EXPIRED);
            throw new RuntimeException();
        }
    }


    /** JWT 만료 일시를 지정하기 위한 메서드로 JWT 생성 시 사용 **/
    public Date getTokenExpiration(int expirationMinutes) {
        Calendar calendar = Calendar.getInstance();
        calendar.add(Calendar.MINUTE, expirationMinutes);
        Date expiration = calendar.getTime();

        return expiration;
    }

    /** JWT의 서명에 사용할 Secret Key 생성해주는 메서드 **/
    private Key getKeyFromBase64EncodedKey(String base64EncodedSecretKey) {

        byte[] keyBytes = Decoders.BASE64.decode(base64EncodedSecretKey);
        Key key = Keys.hmacShaKeyFor(keyBytes);

        return key;
    }

    /** Access Token 생성 **/
    public String delegateAccessToken(Member member) {
        Map<String, Object> claims = new HashMap<>();

        claims.put("memberId", member.getMemberId()); // 식별자 포함
        claims.put("username", member.getEmail());
        claims.put("roles", member.getRoles());

        String subject = member.getEmail();
        Date expiration = getTokenExpiration(getAccessTokenExpirationMinutes());

        String base64EncodedSecretKey = encodeBase64SecretKey(getSecretKey());

        String accessToken = generateAccessToken(claims, subject, expiration, base64EncodedSecretKey);

        return accessToken;
    }


    /** Refresh Token 생성 **/
    public String delegateRefreshToken(Member member) {
        String subject = member.getEmail();
        Date expiration = getTokenExpiration(getRefreshTokenExpirationMinutes());
        String base64EncodedSecretKey = encodeBase64SecretKey(getSecretKey());

        String refreshToken = generateRefreshToken(subject, expiration, base64EncodedSecretKey);

        return refreshToken;
    }
}