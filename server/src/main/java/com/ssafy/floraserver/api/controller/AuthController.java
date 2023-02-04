package com.ssafy.floraserver.api.controller;

import com.ssafy.floraserver.api.request.StoreExtraInfoReq;
import com.ssafy.floraserver.api.request.UserExtraInfoReq;
import com.ssafy.floraserver.api.service.AuthService;
import com.ssafy.floraserver.common.util.SecurityUtil;
import com.ssafy.floraserver.db.entity.Store;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Map;
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
      log.info(SecurityUtil.getCurrentUser().toString());
      log.info("AuthController /users GET 성공");  
    }

    @PutMapping("/users")
    public ResponseEntity<?> createUserExtraInfo(@RequestBody UserExtraInfoReq userExtraInfoReq){
        Map<String, String> authInfo = SecurityUtil.getCurrentUser();
        authService.createUserExtraInfo(userExtraInfoReq, authInfo);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @PutMapping("/stores")
    public ResponseEntity<?> createStoreExtraInfo(@RequestBody StoreExtraInfoReq storeExtraInfoReq){
        Map<String, String> authInfo = SecurityUtil.getCurrentUser();
        log.info("현재 로그인 {} ", authInfo.toString());
        Store store = authService.createStoreExtraInfo(storeExtraInfoReq, authInfo);

        // TODO 확인용으로 저장한 Store 객체 리턴했음. 수정하기
        return new ResponseEntity<>(store, HttpStatus.CREATED);
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
