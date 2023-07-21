package com.bobfriends.bf.auth.handler;

import com.bobfriends.bf.exception.BusinessLogicException;
import com.bobfriends.bf.exception.ExceptionCode;
import com.bobfriends.bf.member.entity.Member;
import com.bobfriends.bf.member.repository.MemberRepository;
import com.google.gson.JsonObject;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.nio.charset.StandardCharsets;
import java.util.Optional;

@Slf4j
@Component
@RequiredArgsConstructor
public class MemberAuthenticationSuccessHandler implements AuthenticationSuccessHandler {
   private final MemberRepository memberRepository;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request,
                                        HttpServletResponse response,
                                        Authentication authentication) throws IOException {

        Optional<Member> findMember = memberRepository.findByEmail(authentication.getName());
        Member member = findMember.orElseThrow(() -> new  BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));

        long memberId = member.getMemberId();

        String location = member.getLocation();
        Member.genderStatus gender = member.getGender();

        // 응답 본문에 포함
        response.setStatus(HttpStatus.OK.value());
        response.setContentType(MediaType.APPLICATION_JSON_VALUE);
        response.setCharacterEncoding(StandardCharsets.UTF_8.toString());

        try (PrintWriter writer = response.getWriter()){
            JsonObject json = new JsonObject();
            json.addProperty("memberId", memberId);
            json.addProperty("location", location);
            json.addProperty("gender", String.valueOf(gender));
            writer.write(json.toString());
        }
    }
}