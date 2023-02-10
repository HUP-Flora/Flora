package com.ssafy.floraserver.api.response;

import lombok.Builder;
import lombok.Getter;

@Getter
public class RoleRes {

    private String userType;

    @Builder
    public RoleRes(String userType) {
        this.userType = userType;
    }
}
