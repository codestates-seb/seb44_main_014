package com.bobfriends.bf.auth.service;

import com.bobfriends.bf.auth.jwt.JwtTokenizer;
import com.bobfriends.bf.exception.BusinessLogicException;
import com.bobfriends.bf.exception.ExceptionCode;
import com.bobfriends.bf.member.entity.Member;
import com.bobfriends.bf.member.repository.MemberRepository;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.transaction.Transactional;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional
public class AuthService {

    private final JwtTokenizer jwtTokenizer;
    private final MemberRepository memberRepository;

    /** Access Token 재발급 **/
    // 문제점 : 재발급 전의 토큰 유효기간 남아있으면 전 토큰으로도 가능
    // but, 클라이언트 측에서 남아있는 시간 계산해서 만료되었을 때에만 재발급 요청 보내주면 해결 가능하긴 함
    public void reissue(HttpServletRequest request, HttpServletResponse response) {

        String refreshToken = request.getHeader("Refresh");

        Jws<Claims> claims = jwtTokenizer.verifySignature(refreshToken);

        String email = claims.getBody().getSubject();
        Optional<Member> optionalMember = memberRepository.findByEmail(email);
        Member member = optionalMember.orElseThrow(() ->
                new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));

        String newAccessToken = jwtTokenizer.delegateAccessToken(member);
        response.setHeader("Authroization", "Bearer " + newAccessToken);
    }
}
