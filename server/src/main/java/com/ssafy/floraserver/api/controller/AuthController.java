package com.ssafy.floraserver.api.controller;

import com.ssafy.floraserver.api.request.StoreExtraInfoReq;
import com.ssafy.floraserver.api.request.UserExtraInfoReq;
import com.ssafy.floraserver.api.response.RoleRes;
import com.ssafy.floraserver.api.service.AuthService;
import com.ssafy.floraserver.common.util.SecurityUtil;
import com.ssafy.floraserver.db.entity.Store;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.Map;
import javax.servlet.http.HttpServletRequest;

@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/v1/auth")
public class AuthController {

    private final AuthService authService;


    @GetMapping("/hello")
    public String hello(){
        return "hello";
    }
    
    @GetMapping("/users")
    public void getUsers(){
//      log.info(SecurityUtil.getCurrentUser().toString());
      log.info("AuthController /users GET 성공");  
    }

    @PutMapping("/users")
//    @PreAuthorize("hasRole('ROLE_GUEST')")
    public ResponseEntity<?> createUserExtraInfo(@RequestBody UserExtraInfoReq userExtraInfoReq){
        Map<String, String> authInfo = SecurityUtil.getCurrentUser();
        authService.createUserExtraInfo(userExtraInfoReq, authInfo);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @PutMapping("/stores")
//    @PreAuthorize("hasRole('ROLE_GUEST')")
    public ResponseEntity<?> createStoreExtraInfo(
                                                  @RequestPart("file") MultipartFile file,
                                                  @RequestPart("storeExtraInfoReq") StoreExtraInfoReq storeExtraInfoReq){
        Map<String, String> authInfo = SecurityUtil.getCurrentUser();
        log.info("현재 로그인 {} ", authInfo.toString());
        log.info(storeExtraInfoReq.toString());
        Store store = authService.createStoreExtraInfo(storeExtraInfoReq, file, authInfo);

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

    @GetMapping("/role")
    public RoleRes getLoginRole(){
        Map<String, String> authInfo = SecurityUtil.getCurrentUser();
        RoleRes roleRes = authService.getLoginRole(authInfo);
        return roleRes;
    }
}
