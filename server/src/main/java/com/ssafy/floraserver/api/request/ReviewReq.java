package com.ssafy.floraserver.api.request;

import lombok.Getter;
import lombok.ToString;

@Getter
@ToString
public class ReviewReq {

    private Long store;
    private Long order;
    private String content;

}
