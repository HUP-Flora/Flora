package com.ssafy.floraserver.db.entity.enums;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum Role {
    GUEST("ROLE_GUEST"),
    CUSTOMER("ROLE_CUSTOMER"),
    STORE("ROLE_STORE");


    private final String key;
}
