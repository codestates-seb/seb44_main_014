package com.bobfriends.bf.auth.handler;

import com.bobfriends.bf.auth.jwt.JwtTokenizer;
import com.bobfriends.bf.auth.utils.CustomAuthorityUtils;
import com.bobfriends.bf.member.entity.Member;
import com.bobfriends.bf.member.repository.MemberRepository;
import lombok.AllArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.util.UriComponentsBuilder;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.transaction.Transactional;
import java.io.IOException;
import java.net.URI;
import java.util.*;

@AllArgsConstructor
public class OAuth2MemberSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {
    private final JwtTokenizer jwtTokenizer;
    private final CustomAuthorityUtils authorityUtils;
    private final MemberRepository memberRepository;

    @Override
    @Transactional
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
        var oAuth2User = (OAuth2User)authentication.getPrincipal();

        // Resource Owner의 이메일 주소를 얻는다
        String email = String.valueOf(oAuth2User.getAttributes().get("email"));

        // 권한 정보 생성
        List<String> roles = authorityUtils.createRoles(email);

        Member member = makeMember(email, roles);
        Optional<Member> findMember = memberRepository.findByEmail(email);
        if (findMember.isPresent()) {
            member = findMember.get();
        } else {
            member = memberRepository.save(member);
        }

        // Access Token과 Refresh Token을 생성해서 Frontend 애플리케이션에 전달하기 위해 Redirect
        redirect(request, response, member, roles);
    }

    private Member makeMember(String email, List<String> roles) {
        Member member = new Member();
        member.updateEmail(email);
        member.updateRoles(roles);

        return member;
    }

    private void redirect(HttpServletRequest request, HttpServletResponse response, Member member, List<String> authorities) throws IOException {
        String accessToken = delegateAccessToken(member);
        String refreshToken = delegateRefreshToken(member);

        String uri = createURI(request, accessToken, refreshToken).toString();

        String headerValue = "Bearer" + accessToken;
        response.setHeader("Authorization", headerValue);
        response.setHeader("Refresh", refreshToken);

        // Front 쪽으로 리다이렉트
        getRedirectStrategy().sendRedirect(request, response, uri);
    }

    private String delegateAccessToken(Member member) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("username", member.getEmail());
        claims.put("roles", member.getRoles());

        String subject = member.getEmail();

        Date expiration = jwtTokenizer.getTokenExpiration(jwtTokenizer.getAccessTokenExpirationMinutes());

        String base64EncodedSecretKey = jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey());

        String accessToken = jwtTokenizer.generateAccessToken(claims, subject, expiration, base64EncodedSecretKey);

        return accessToken;
    }

    private String delegateRefreshToken(Member member) {
        String subject = member.getEmail();

        Date expiration = jwtTokenizer.getTokenExpiration(jwtTokenizer.getRefreshTokenExpirationMinutes());
        String base64EncodedSecretKey = jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey());

        String refreshToken = jwtTokenizer.generateRefreshToken(subject, expiration, base64EncodedSecretKey);

        return refreshToken;
    }

    private URI createURI(HttpServletRequest request, String accessToken, String refreshToken) {

        MultiValueMap<String, String> queryParams = new LinkedMultiValueMap<>();
        queryParams.add("access_token", accessToken);
        queryParams.add("refresh_token", refreshToken);

        String serverName = request.getServerName();

        return UriComponentsBuilder
                .newInstance()
                .scheme("http")
//                .host("localhost")
//                .host("ec2-43-201-8-99.ap-northeast-2.compute.amazonaws.com")
                .host("localhost")
//                .port(80)   //-> aws로 배포했을 때 사용
                .port(3000)   //-> local 테스트용
                .path("/oauth2")  // 리다이렉트 주소 (토큰이 포함된 url 을 받는 주소)
                .queryParams(queryParams)
                .build()
                .toUri();
    }

}