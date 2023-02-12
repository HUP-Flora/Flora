package com.ssafy.floraserver.api.response;

import lombok.Builder;
import lombok.Getter;

@Getter
public class ReserveRes {
    private Long oId;
    private String sImg;

    @Builder
    public ReserveRes(Long oId, String sImg) {
        this.oId = oId;
        this.sImg = sImg;
    }
}
