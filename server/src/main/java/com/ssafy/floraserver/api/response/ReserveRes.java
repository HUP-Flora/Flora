package com.ssafy.floraserver.api.response;

import lombok.Builder;
import lombok.Getter;

@Getter
public class ReserveRes {
    private Long oId;
    private String pImg;

    @Builder
    public ReserveRes(Long oId, String pImg) {
        this.oId = oId;
        this.pImg = pImg;
    }
}
