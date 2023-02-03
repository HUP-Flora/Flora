package com.ssafy.floraserver.api.controller;

import com.ssafy.floraserver.api.service.AuthService;
import com.ssafy.floraserver.common.util.SecurityUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;

@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    @GetMapping("/hello")
    public String hello(){
        return "hello";
    }
    
    @GetMapping("/users")
    public void getUsers(){
      log.info(SecurityUtil.getCurrentMemberId());
      log.info("AuthController /users GET 성공");  
    }

    @GetMapping("/reissue")
    public String reissueAccessToken(HttpServletRequest request, @RequestHeader("Authorization") String oldAccessToken){
        oldAccessToken = oldAccessToken.substring(7);

        String refreshToken = SecurityUtil.getCookie(request, "refresh")
                .orElseThrow(() -> new RuntimeException("refresh token이 없습니다."))
                .getValue();

        log.info("refreshToken : {}", refreshToken);

        String newAccessToken = authService.reissueAccessToken(oldAccessToken, refreshToken);

        return newAccessToken;
    }
}
