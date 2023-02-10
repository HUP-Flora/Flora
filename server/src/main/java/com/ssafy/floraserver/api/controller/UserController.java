package com.ssafy.floraserver.api.controller;

import com.ssafy.floraserver.api.request.UserNicknameReq;
import com.ssafy.floraserver.api.request.UserPhoneNumberReq;
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

    @PutMapping("/nickname")
    public ResponseEntity<?> updateUserNickname(@RequestBody UserNicknameReq userNicknameReq){
        Map<String, String> authInfo = SecurityUtil.getCurrentUser();
        userService.updateUserNickname(userNicknameReq, authInfo);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @PutMapping("/phonenumber")
    public ResponseEntity<?> updateUserNickname(@RequestBody UserPhoneNumberReq userPhoneNumberReq){
        Map<String, String> authInfo = SecurityUtil.getCurrentUser();
        userService.updateUserPhoneNumber(userPhoneNumberReq, authInfo);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }
}
