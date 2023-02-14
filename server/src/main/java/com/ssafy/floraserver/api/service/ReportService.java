package com.ssafy.floraserver.api.service;

import com.ssafy.floraserver.api.request.ReportReq;
import com.ssafy.floraserver.common.exception.CustomException;
import com.ssafy.floraserver.common.exception.ErrorCode;
import com.ssafy.floraserver.db.entity.Order;
import com.ssafy.floraserver.db.entity.Report;
import com.ssafy.floraserver.db.repository.OrderRepository;
import com.ssafy.floraserver.db.repository.ReportRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.Map;

@Service
@Slf4j
@RequiredArgsConstructor
@Transactional
public class ReportService {

    private final ReportRepository reportRepository;
    private final OrderRepository orderRepository;

    public void createReport(ReportReq reportReq, Map<String, String> authInfo) {

        Long uId = Long.parseLong(authInfo.get("uId"));

        Order order = orderRepository.findById(reportReq.getOrder())
                .orElseThrow(() -> new CustomException(ErrorCode.ORDER_NOT_FOUND));

        // 주문 상태도 체크?

        if(!reportRepository.findByOId(order.getOId()).isEmpty()){
            throw new CustomException(ErrorCode.REPORT_EXISTS);
        }

        reportRepository.save(Report.builder()
                .oId(order)
                .date(LocalDateTime.now())
                .build());
    }
}
