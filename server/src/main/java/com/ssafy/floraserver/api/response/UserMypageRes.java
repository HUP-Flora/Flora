package com.ssafy.floraserver.api.response;

import com.ssafy.floraserver.db.entity.User;
import lombok.Builder;
import lombok.Getter;

@Getter
public class UserMypageRes {
    private String nickname;
    private String phoneNumber;

    @Builder
    public UserMypageRes(User user) {
        this.nickname = user.getNickname();
        this.phoneNumber = user.getPhoneNumber();
    }
}
