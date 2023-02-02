package com.ssafy.floraserver.api.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@Slf4j
public class AuthController {
    
    @GetMapping("/users")
    public void getUsers(){
        
      log.info("AuthController /users GET 성공");  
    }
}
