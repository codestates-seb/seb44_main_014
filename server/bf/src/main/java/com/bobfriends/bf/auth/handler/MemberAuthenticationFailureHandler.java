package com.bobfriends.bf.auth.handler;

import com.bobfriends.bf.response.ErrorResponse;
import com.google.gson.Gson;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.net.URLEncoder;

@Slf4j
public class MemberAuthenticationFailureHandler implements AuthenticationFailureHandler {

    @Override
    public void onAuthenticationFailure(HttpServletRequest request,
                                        HttpServletResponse response,
                                        AuthenticationException exception) throws IOException {
        log.error("# 인증 실패: {}", exception.getMessage());

        String errorMessage;

        if(exception instanceof BadCredentialsException) {
            errorMessage = "비밀번호가 일치하지 않습니다.";
            sendErrorResponse(response, errorMessage, HttpStatus.UNAUTHORIZED);
        } else if (exception instanceof DisabledException) {
            errorMessage = "현재 사용할 수 없는 계정 입니다.";
            sendErrorResponse(response, errorMessage, HttpStatus.NOT_FOUND);
        } else {
            errorMessage = "계정을 찾을 수 없습니다";
            sendErrorResponse(response, errorMessage, HttpStatus.NOT_FOUND);
        }
    }


    private void sendErrorResponse(HttpServletResponse response, String errorMessage, HttpStatus httpStatus) throws IOException {
        Gson gson = new Gson();
        ErrorResponse errorResponse = ErrorResponse.of(httpStatus, errorMessage);
        response.setContentType(MediaType.APPLICATION_JSON_VALUE);
        response.setStatus(httpStatus.value());
        response.getWriter().write(gson.toJson(errorResponse, ErrorResponse.class));
    }
}
