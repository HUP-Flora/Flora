package com.ssafy.floraserver.api.controller;

import com.ssafy.floraserver.api.service.PayService;
import com.ssafy.floraserver.api.vo.PayAppResVo;
import com.ssafy.floraserver.api.vo.PayReadyReqVo;
import com.ssafy.floraserver.api.vo.PayReadyResVo;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import javax.servlet.http.HttpServletResponse;

@RestController
@Slf4j
@RequestMapping("/api/pay")
@RequiredArgsConstructor
public class PayController {

    private final PayService payService;
    private PayReadyResVo payReadyResVo;

    // 결제 준비 -> 주문 정보 가져오기 : 상품명, 상품 총액
    // 테스트에서는 cid = TC0ONETIME
    @PostMapping("/{oId}")
    public ResponseEntity<?> payReady(@PathVariable("oId") Long oId) {
        log.info("주문 번호 : {} 에 대한 결제 준비", oId);
        payReadyResVo = payService.payReady(oId);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @GetMapping("/approval")
    public void payApproval(HttpServletResponse response, @RequestParam String pg_token) {
        log.info("결제 번호 : {} 에 대한 결제 승인", payReadyResVo.getTid());
        System.out.println("Approval: " + payReadyResVo.getTid());
        System.out.println("pg_token : "+pg_token);
        payService.payApproval(payReadyResVo, pg_token);
    }
}
