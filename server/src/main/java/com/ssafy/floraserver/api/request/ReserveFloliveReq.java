package com.ssafy.floraserver.api.request;

import lombok.Getter;
import lombok.ToString;

@Getter
@ToString
public class ReserveFloliveReq {

    private Long sId;
    private Long pId;
    private String reservationDate;
    private Long reservationTime;

}
