package com.ssafy.floraserver.api.request;

import lombok.Getter;
import lombok.ToString;

@Getter
@ToString
public class StoreExtraInfoReq {
    private String businessLicense;
    private String name;
    private String phoneNumber;
    private String sido;
    private String gugun;
    private String dong;
    private String detailedAddress;
    private float lat;
    private float lng;
    private String desc;
    private Long start;
    private Long end;
    private String holiday;

}
