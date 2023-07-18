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
import javax.transaction.Transactional;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional
public class AuthService {

    private final JwtTokenizer jwtTokenizer;
    private final MemberRepository memberRepository;

    public void reissue(HttpServletRequest request) {

        String refreshToken = request.getHeader("Refresh");

        Jws<Claims> claims = jwtTokenizer.verifySignature(refreshToken);

        log.info("email로 member 조회");
        String email = claims.getBody().getSubject();
        Optional<Member> optionalMember = memberRepository.findByEmail(email);
        Member member = optionalMember.orElseThrow(() ->
                new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));

        // 새로 발급
        String accessToken = jwtTokenizer.delegateAccessToken(member);
    }
}
