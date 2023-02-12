package com.ssafy.floraserver.api.request;

import lombok.Getter;
import lombok.ToString;

@Getter
@ToString
public class ReserveFloliveReq {

    private Long sid;
    private Long pid;
    private String reservationDate;
    private Long reservationTime;

}
