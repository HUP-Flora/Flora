package com.ssafy.floraserver.db.entity.enums;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum Role {
    GUEST("ROLE_GUEST"),
    ROLE_CUSTOMER("ROLE_CUSTOMER"),
    ROLE_STORE("ROLE_STORE");


    private final String key;
}
