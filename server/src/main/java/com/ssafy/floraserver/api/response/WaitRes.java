package com.ssafy.floraserver.api.response;

import com.ssafy.floraserver.db.entity.Order;
import com.ssafy.floraserver.db.entity.TimeUnit;
import com.ssafy.floraserver.db.entity.enums.Role;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalTime;

@Getter
@Setter
@NoArgsConstructor
public class WaitRes {

    private Role userRole;
    private Long oId;
    private LocalDate reservationDate;
    private Long reservationTime;
    private String sName;
    private String pName;
    private String pImge;

    @Builder
    public WaitRes(Order order) {
        this.userRole = order.getUId().getRole();
        this.oId = order.getOId();
        this.reservationDate = order.getConId() != null ? order.getConId().getReservationDate() : null;
        this.reservationTime = order.getConId() != null? order.getConId().getReservationTime().getTuId() : null;
        this.sName = order.getSId().getName();
        this.pName = order.getPId().getName();
        this.pImge = order.getPId().getImgPath();
    }
}


