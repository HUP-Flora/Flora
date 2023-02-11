package com.ssafy.floraserver.api.controller;

import com.ssafy.floraserver.api.response.OrderRes;
import com.ssafy.floraserver.api.response.StoreOrderRes;
import com.ssafy.floraserver.api.response.UserOrderRes;
import com.ssafy.floraserver.api.service.OrderService;
import com.ssafy.floraserver.common.util.SecurityUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@Slf4j
@RequestMapping("/v1/orders")
@RequiredArgsConstructor
public class OrderController {

    private final OrderService orderService;

    @GetMapping("/stores")
    public Page<StoreOrderRes> findStoreOrderList(Pageable pageable) {
        Map<String, String> authInfo = SecurityUtil.getCurrentUser();
        Page<StoreOrderRes> storeOrderResList = orderService.findStoreOrderList(pageable, authInfo);
        return storeOrderResList;
    }

    @GetMapping("/users")
    public Page<UserOrderRes> findUserOrderList(Pageable pageable) {
        Map<String, String> authInfo = SecurityUtil.getCurrentUser();
        Page<UserOrderRes> userOrderResList = orderService.findUserOrderList(pageable, authInfo);
        return userOrderResList;
    }

    @GetMapping("{oId}")
    public OrderRes findOrder(@PathVariable("oId") Long oId) {
        Map<String, String> authInfo = SecurityUtil.getCurrentUser();
        OrderRes orderRes = orderService.findOrder(oId, authInfo);
        return orderRes;
    }

    // 상태 변경 API
    @PostMapping("changestatus/{oId}")
    public ResponseEntity<?> changeToDelivery(@PathVariable Long oId) {
        log.info("주문 번호 {} 주문 상태 변경 시도", oId);
        orderService.changeOrderStatus(oId);
        log.info("주문 번호 {} 주문 상태 변경 완료", oId);
        return new ResponseEntity<>(HttpStatus.OK);
    }

}
