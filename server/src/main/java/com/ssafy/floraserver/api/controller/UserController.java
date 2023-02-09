package com.ssafy.floraserver.api.controller;

import com.ssafy.floraserver.api.request.UserInfoReq;
import com.ssafy.floraserver.api.response.UserMypageRes;
import com.ssafy.floraserver.api.service.UserService;
import com.ssafy.floraserver.common.util.SecurityUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/v1/users")
public class UserController {

    private final UserService userService;

    @GetMapping
    public UserMypageRes findUserMypageInfo(){
        Map<String, String> authInfo = SecurityUtil.getCurrentUser();
        UserMypageRes userMypageRes = userService.findUserMypageInfo(authInfo);
        return userMypageRes;
    }

    @PutMapping
    public ResponseEntity<?> updateUserInfo(@RequestBody UserInfoReq userInfoReq){
        Map<String, String> authInfo = SecurityUtil.getCurrentUser();
        userService.updateUserInfo(userInfoReq, authInfo);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }
}
