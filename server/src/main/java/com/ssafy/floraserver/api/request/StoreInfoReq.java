package com.ssafy.floraserver.api.request;

import lombok.Getter;

@Getter
public class StoreInfoReq {

    private String name;
    private String phoneNumber;
    private String region_1depth_name;
    private String region_2depth_name;
    private String region_3depth_name;
    private String address_name;
    private Float lat;
    private Float lng;
    private String desc;
    private Long start;
    private Long end;
    private String holiday;
}
