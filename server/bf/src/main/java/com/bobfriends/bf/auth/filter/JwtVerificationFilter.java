package com.bobfriends.bf.auth.filter;

import com.bobfriends.bf.auth.jwt.JwtTokenizer;
import com.bobfriends.bf.auth.utils.CustomAuthorityUtils;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.security.SignatureException;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;
import java.util.Map;

/** Client 에서 보내주는 Authorization header 의 AccessToken 검증 **/
@RequiredArgsConstructor
public class JwtVerificationFilter extends OncePerRequestFilter {
    private final JwtTokenizer jwtTokenizer;
    private final CustomAuthorityUtils authorityUtils;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {

        try {
            Map<String, Object> claims = verifyJws(request);
            setAuthenticationToContext(claims);
        } catch (SignatureException se) {
            request.setAttribute("exception", se);
        } catch (ExpiredJwtException ee) {
            request.setAttribute("exception", ee);
        } catch (Exception e) {
            request.setAttribute("exception", e);
        }

        // JWT의 서명 검증에 성공하고, Authentication을 저장한 뒤에는 다음 Security Filter을 호출
        filterChain.doFilter(request, response);
    }


    /** 특정 조건에 부합하면(true) 해당 Filter의 동작을 수행하지 않고 다음 Filter로 건너뛴다 **/
    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) throws ServletException {

        String authorization = request.getHeader("Authorization");

        return authorization == null || !authorization.startsWith("Bearer");
    }

    /** JWT를 검증하는데 사용
     * - client의 request header에서 Token 추출
     * **/
    private Map<String, Object> verifyJws(HttpServletRequest request) {

        String jws = request.getHeader("Authorization").replace("Bearer ", "");
        String base64EncodedSecretKey = jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey());

        // JWT에서 claims를 파싱 (서명 검증 성공)
        Map<String, Object> claims = jwtTokenizer.getClaims(jws, base64EncodedSecretKey).getBody();

        return claims;
    }


    /** Authentication 객체를 SecurityContext에 저장 **/
    @SuppressWarnings("unchecked")
    private void setAuthenticationToContext(Map<String, Object> claims) {

        String username = (String) claims.get("username");

        List<GrantedAuthority> authorities = authorityUtils.createAuthorities((List)claims.get("roles"));
        Authentication authentication = new UsernamePasswordAuthenticationToken(username, null, authorities);
        SecurityContextHolder.getContext().setAuthentication(authentication);
    }
}