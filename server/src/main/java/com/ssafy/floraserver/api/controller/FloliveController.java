package com.ssafy.floraserver.api.controller;

import com.ssafy.floraserver.api.request.ReceiptReq;
import com.ssafy.floraserver.api.request.ReserveFloliveReq;
import com.ssafy.floraserver.api.response.ConferenceRes;
import com.ssafy.floraserver.api.service.FloliveService;
import com.ssafy.floraserver.common.util.SecurityUtil;
import io.openvidu.java.client.OpenViduHttpException;
import io.openvidu.java.client.OpenViduJavaClientException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/v1/flolive")
public class FloliveController {

    private final FloliveService floliveService;

    //    @PreAuthorize("hasRole('ROLE_CUSTOMER')")
    @PostMapping("/{sId}") // 가게에서 바로 신청, 상품 코드 1,
    public ResponseEntity<?> applyFlolive(@PathVariable("sId") Long sId) {
        log.info(floliveService.createOrderNum(LocalDate.now()));
        Map<String, String> authInfo = SecurityUtil.getCurrentUser();
        floliveService.applyFlolive(sId, authInfo);
        log.info("가게 번호 {}에 대한 고객 번호 {} 의 플로라이브 신청", sId, authInfo.get("uId"));
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping("/detail/{pId}") // 상품에서 바로 신청
    public ResponseEntity<?> applyFloliveProduct(@PathVariable("pId") Long pId) {
        Map<String, String> authInfo = SecurityUtil.getCurrentUser();
        floliveService.applyFloliveProduct(pId, authInfo);
        log.info("상품 번호 {}에 대한 고객 번호 {} 플로라이브 신청", pId, authInfo.get("uId"));
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/{oId}") // 수락, 토큰, 세션 ID 리턴
    public ResponseEntity<?> acceptFlolive(@PathVariable("oId") Long oId) throws OpenViduJavaClientException, OpenViduHttpException {
        Map<String, String> authInfo = SecurityUtil.getCurrentUser();
        ConferenceRes conferenceRes = floliveService.acceptFlolive(oId, authInfo);
        log.info(conferenceRes.toString());
        log.info("주문 번호 {} 에 대한 플로라이브 요청 가게 수락", oId);
        return new ResponseEntity<>(conferenceRes, HttpStatus.CREATED);
    }

    @PutMapping("/{oId}") // 거절
    public ResponseEntity<?> refuseFlolive(@PathVariable("oId") Long oId) {
        Map<String, String> authInfo = SecurityUtil.getCurrentUser();
        floliveService.refuseFlolive(oId, authInfo);
        log.info("주문 번호 {} 에 대한 플로라이브 요청 가게 거절", oId);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/entry/{conId}") // 입장, 토큰 필요
    public ResponseEntity<?> entryFlolive(@PathVariable("conId") Long conId) {
        Map<String, String> authInfo = SecurityUtil.getCurrentUser();
        ConferenceRes conferenceRes = floliveService.entryFlolive(conId, authInfo);
        log.info(conferenceRes.toString());
        log.info("화상미팅 번호 {}에 대한 플로라이브 입장", conId);
        return new ResponseEntity<>(conferenceRes, HttpStatus.CREATED);
    }

    // 예약
    @PostMapping("reserve")
    public ResponseEntity<?> reserveFlolive(@RequestBody ReserveFloliveReq reserveFloliveReq) {
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping("/{oId}/receipt") // 수령 정보 작성
    public ResponseEntity<?> createReceipt(@RequestBody ReceiptReq receiptReq) {
        Map<String, String> authInfo = SecurityUtil.getCurrentUser();
        floliveService.createReceipt(receiptReq, authInfo);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }
}