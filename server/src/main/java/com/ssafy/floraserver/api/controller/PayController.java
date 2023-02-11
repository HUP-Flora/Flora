package com.ssafy.floraserver.api.controller;

import com.ssafy.floraserver.api.response.PaySucessRes;
import com.ssafy.floraserver.api.service.PayService;
import com.ssafy.floraserver.api.vo.PayReadyResVo;
import com.ssafy.floraserver.db.entity.Order;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import javax.servlet.http.HttpServletResponse;
import java.util.Map;

@RestController
@Slf4j
@RequestMapping("/v1/pay")
@RequiredArgsConstructor
public class PayController {

    private final PayService payService;
    private Map<String, Object> map;

    // 결제 준비 -> 주문 정보 가져오기 : 상품명, 상품 총액
    // 테스트에서는 cid = TC0ONETIME
    @PostMapping("/{oId}")
    public ResponseEntity<?> payReady(@PathVariable Long oId) {
        log.info("주문 번호 {} 에 대한 결제 준비", oId);
        map = payService.payReady(oId);
        PayReadyResVo payReadyResVo = (PayReadyResVo) map.get("PayReadyResVo");
        return new ResponseEntity<PayReadyResVo>(payReadyResVo, HttpStatus.CREATED);
    }

    @GetMapping("/approval")
    public void payApproval(HttpServletResponse response, @RequestParam String pg_token) {
        PayReadyResVo payReadyResVo = (PayReadyResVo) map.get("PayReadyResVo");
        log.info("결제 번호 {} 에 대한 결제 승인", payReadyResVo.getTid());
        log.info("Approval: " + payReadyResVo.getTid());
        log.info("pg_token : "+pg_token);
        Long oId = ((Order) map.get("Order")).getOId();
        payService.payApproval(payReadyResVo, pg_token, oId);
    }

    @GetMapping("{oId}/success")
    public ResponseEntity<?> paySuccess(@PathVariable Long oId) {
        log.info("주문 번호 {} 에 대한 결제 완료 정보 요청", oId);
        PaySucessRes paySucessRes = payService.paySuccess(oId);
        log.info("주문 번호 {} 에 대한 결제 완료 정보 반환", oId);
        return new ResponseEntity<>(paySucessRes, HttpStatus.OK);
    }
}
