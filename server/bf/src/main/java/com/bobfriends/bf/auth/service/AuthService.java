package com.bobfriends.bf.auth.service;

import com.bobfriends.bf.auth.entity.RefreshToken;
import com.bobfriends.bf.auth.jwt.JwtTokenizer;
import com.bobfriends.bf.auth.repository.RefreshTokenRepository;
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
    private final RefreshTokenRepository refreshTokenRepository;

    /** Access Token 재발급
     *  요청 header로 memberId가 올지 RefreshToken이 올지 고민
     * **/
    // 클라이언트 에서 시간 계산후 만료되었을때 재발급 요청
    public void reissue (HttpServletRequest request, HttpServletResponse response) {

        String refreshToken = request.getHeader("Refresh");
        System.out.println("refreshToken = " + refreshToken);

        Jws<Claims> claims = jwtTokenizer.verifySignature(refreshToken);

        String email = claims.getBody().getSubject();

        Optional<Member> optionalMember = memberRepository.findByEmail(email);
        Member member = optionalMember.orElseThrow(() ->
                new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));

        RefreshToken refreshTokenDb = refreshTokenRepository.findRefreshTokenByMemberId(member.getMemberId());
        System.out.println("refreshTokenDb = " + refreshTokenDb);

        // 만약 header로 온 refreshToken과 DB에 저장된 refreshToken이 같다면 재발급
        if (refreshToken.equals(refreshTokenDb.getJws())) {
            String newAccessToken = jwtTokenizer.delegateAccessToken(member);
            response.setHeader("Authorization", "Bearer " + newAccessToken);
        }else {
            throw new BusinessLogicException(ExceptionCode.REFRESH_TOKEN_NOT_SAME);
        }

    }
}
