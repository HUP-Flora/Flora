package com.ssafy.floraserver.api.service;

import com.ssafy.floraserver.api.request.UserInfoReq;
import com.ssafy.floraserver.api.response.UserMypageRes;
import com.ssafy.floraserver.db.entity.User;
import com.ssafy.floraserver.db.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.util.Map;

@Service
@Slf4j
@RequiredArgsConstructor
@Transactional
public class UserService {

    private final UserRepository userRepository;

    public UserMypageRes findUserMypageInfo(Map<String, String> authInfo) {

        Long uId = Long.parseLong(authInfo.get("uId"));

        User user = userRepository.findById(uId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));

        return UserMypageRes.builder()
                .user(user)
                .build();
    }

    public void updateUserInfo(UserInfoReq userInfoReq, Map<String, String> authInfo) {

        Long uId = Long.parseLong(authInfo.get("uId"));

        User user = userRepository.findById(uId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));

        user.updateNickname(userInfoReq.getNickname());
        user.updatePhoneNumber(userInfoReq.getPhoneNumber());
    }
}
