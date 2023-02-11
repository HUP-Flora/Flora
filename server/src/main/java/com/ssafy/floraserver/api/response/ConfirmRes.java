package com.ssafy.floraserver.api.response;

import com.ssafy.floraserver.db.entity.Order;
import com.ssafy.floraserver.db.entity.enums.Role;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
public class ConfirmRes {

    private Role userRole;
    private Long oId;
    private Long conId;
    private LocalDate reservationDate;
    private Long reservationTime;
    private String sessionId;
    private String token;
    private String sName;
    private String pName;

    @Builder
    public ConfirmRes(Order order) {
        this.userRole = order.getUId().getRole();
        this.oId = order.getOId();
        this.conId = order.getConId().getConId();
        this.reservationDate = order.getConId().getReservationDate();
        this.reservationTime = order.getConId().getReservationTime().getTuId();
        this.sessionId = order.getConId().getSessionId();
        this.token = order.getConId().getToken();
        this.sName = order.getSId().getName();
        this.pName = order.getPId().getName();
    }
}


