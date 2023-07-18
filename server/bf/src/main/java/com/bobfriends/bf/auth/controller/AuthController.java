package com.bobfriends.bf.auth.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/auth")
@Validated
@RequiredArgsConstructor
public class AuthController {

    /** Access token 재발급 **/
    @PostMapping("/reissue")
    public ResponseEntity reissue(HttpServletRequest request) {

        return ResponseEntity.ok().build();
    }
}
