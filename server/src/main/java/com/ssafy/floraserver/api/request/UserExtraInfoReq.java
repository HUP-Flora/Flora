package com.ssafy.floraserver.api.request;

import lombok.Getter;
import lombok.ToString;

@Getter
@ToString
public class UserExtraInfoReq {
    private String nickName;
    private String phoneNumber;
}
