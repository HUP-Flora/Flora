package com.ssafy.floraserver.api.response;

import lombok.Getter;

@Getter
public class RegionRes {
    private String region;

    public RegionRes(String region1, String region2, String region3) {
        this.region = region1 + " " + region2 + " " + region3;
    }
}
