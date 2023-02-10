package com.ssafy.floraserver.api.response;

import com.ssafy.floraserver.db.entity.Order;
import com.ssafy.floraserver.db.entity.enums.PaymentStatus;
import com.ssafy.floraserver.db.entity.enums.ReceiptStatus;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
public class ConferenceRes {
    private String userRole;
    private String sessionId;
    private String connectionToken;

    public ConferenceRes(String userRole, String sessionId, String connectionToken) {
        this.userRole = userRole;
        this.sessionId = sessionId;
        this.connectionToken = connectionToken;
    }
}


