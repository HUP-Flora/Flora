package com.ssafy.floraserver.api.service;

import com.ssafy.floraserver.api.request.UserNicknameReq;
import com.ssafy.floraserver.api.request.UserPhoneNumberReq;
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

    public void updateUserNickname(UserNicknameReq userNicknameReq, Map<String, String> authInfo) {
        Long uId = Long.parseLong(authInfo.get("uId"));

        User user = userRepository.findById(uId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));

        user.updateNickname(userNicknameReq.getNickname());
    }

    public void updateUserPhoneNumber(UserPhoneNumberReq userPhoneNumberReq, Map<String, String> authInfo) {
        Long uId = Long.parseLong(authInfo.get("uId"));

        User user = userRepository.findById(uId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));

        user.updatePhoneNumber(userPhoneNumberReq.getPhoneNumber());
    }
}
