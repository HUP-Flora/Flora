package com.ssafy.floraserver.api.controller;

import com.ssafy.floraserver.api.request.ReceiptReq;
import com.ssafy.floraserver.api.request.ReserveFloliveReq;
import com.ssafy.floraserver.api.response.ConferenceRes;
import com.ssafy.floraserver.api.response.ConfirmRes;
import com.ssafy.floraserver.api.response.WaitRes;
import com.ssafy.floraserver.api.service.FloliveService;
import com.ssafy.floraserver.common.util.SecurityUtil;
import com.ssafy.floraserver.db.entity.Order;
import io.openvidu.java.client.OpenViduHttpException;
import io.openvidu.java.client.OpenViduJavaClientException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.aspectj.weaver.ast.Or;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/v1/flolive")
public class FloliveController {

    private final FloliveService floliveService;

    //    @PreAuthorize("hasRole('ROLE_CUSTOMER')")
    @PostMapping("/{sId}") // 가게에서 바로 신청, 상품 코드 1,
    public ResponseEntity<?> applyFlolive(@PathVariable Long sId) {
        Map<String, String> authInfo = SecurityUtil.getCurrentUser();
        String orderNum = floliveService.applyFlolive(sId, authInfo);
        log.info("가게 번호 {}에 대한 고객 번호 {} 의 플로라이브 신청 : {}", sId, authInfo.get("uId"), orderNum);
        return new ResponseEntity<>(orderNum, HttpStatus.CREATED);
    }

    @PostMapping("/detail/{pId}") // 상품에서 바로 신청
    public ResponseEntity<?> applyFloliveProduct(@PathVariable Long pId) {
        Map<String, String> authInfo = SecurityUtil.getCurrentUser();
        floliveService.applyFloliveProduct(pId, authInfo);
        log.info("상품 번호 {} 에 대한 고객 번호 {} 플로라이브 신청", pId, authInfo.get("uId"));
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @GetMapping("/res")
    public ResponseEntity<?> checkStatus(@RequestParam String ordernum) {
        String status = floliveService.checkStatus(ordernum);
        return new ResponseEntity<>(status, HttpStatus.OK);
    }

    @GetMapping("/{oId}") // 수락, 토큰, 세션 ID 리턴
    public ResponseEntity<?> acceptFlolive(@PathVariable Long oId) throws OpenViduJavaClientException, OpenViduHttpException {
        Map<String, String> authInfo = SecurityUtil.getCurrentUser();
        ConferenceRes conferenceRes = floliveService.acceptFlolive(oId, authInfo);
        log.info(conferenceRes.toString());
        log.info("주문 번호 {} 에 대한 플로라이브 요청 가게 수락", oId);
        return new ResponseEntity<>(conferenceRes, HttpStatus.OK);
    }

    @PutMapping("/{oId}") // 거절
    public ResponseEntity<?> refuseFlolive(@PathVariable Long oId) {
        Map<String, String> authInfo = SecurityUtil.getCurrentUser();
        floliveService.refuseFlolive(oId, authInfo);
        log.info("주문 번호 {} 에 대한 플로라이브 요청 가게 거절", oId);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    // TODO 문자알림 서비스
    @GetMapping("/entry/{conId}") // 입장, 토큰 필요
    public ResponseEntity<?> entryFlolive(@PathVariable Long conId) {
        Map<String, String> authInfo = SecurityUtil.getCurrentUser();
        ConferenceRes conferenceRes = floliveService.entryFlolive(conId, authInfo);
        log.info(conferenceRes.toString());
        log.info("화상미팅 번호 {}에 대한 플로라이브 입장", conId);
        return new ResponseEntity<>(conferenceRes, HttpStatus.OK);
    }

    @PostMapping("/reserve")
    public ResponseEntity<?> reserveFlolive(@RequestBody ReserveFloliveReq reserveFloliveReq) throws OpenViduJavaClientException, OpenViduHttpException {
        Map<String, String> authInfo = SecurityUtil.getCurrentUser();
        log.info("예약 시도");
        floliveService.reserveFlolive(reserveFloliveReq, authInfo);
        log.info("예약 성공");
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @PostMapping("/{oId}/receipt") // 수령 정보 작성
    public ResponseEntity<?> createReceipt(@PathVariable Long oId, @RequestBody ReceiptReq receiptReq) {
        Map<String, String> authInfo = SecurityUtil.getCurrentUser();
        log.info("수령 정보 작성 시도");
        floliveService.createReceipt(oId, receiptReq, authInfo);
        log.info("수령 정보 작성 완료");
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @GetMapping("/calendar/{sId}")
    public ResponseEntity<?> storeCalendar(@PathVariable Long sId) {
        String holiday = floliveService.storeCalendar(sId);
        log.info("RESPONSE: 가게 번호 {} 의 휴무일", sId);
        return new ResponseEntity<>(holiday, HttpStatus.OK);
    }

    @GetMapping("/time/{sId}")
    public ResponseEntity<?> storeDate(@PathVariable Long sId, @RequestParam String date) {
        log.info("RESPONSE: 가게 번호 {} 의 {} 예약 불가능 시간 검색", sId, date);
        List<Order> orderList = floliveService.storeDate(sId, date);
        List<Long> reserveList = new ArrayList();
        for (int i = 0; i < orderList.size(); i++) {
            reserveList.add(orderList.get(i).getConId().getReservationTime().getTuId());
            System.out.println(reserveList.get(i));
        }
        return new ResponseEntity<>(reserveList, HttpStatus.OK);
    }

    @GetMapping("/wait/user")
    public ResponseEntity<?> findUserWaitFlolive(Pageable pageable) {
        Map<String, String> authInfo = SecurityUtil.getCurrentUser();
        Page<Order> userWaitList = floliveService.findUserWaitFlolive(pageable, authInfo);
        Page<WaitRes> userWaitResList = userWaitList
                .map(o -> WaitRes.builder().order(o).build());
        log.info("고객 번호 {} 의 플로라이브 수락 대기 목록", authInfo.get("uId"));
        return new ResponseEntity<>(userWaitResList, HttpStatus.OK);
    }

    @GetMapping("/wait/stores")
    public ResponseEntity<?> findStoresWaitFlolive(Pageable pageable) {
        Map<String, String> authInfo = SecurityUtil.getCurrentUser();
        Page<Order> storeWaitList = floliveService.findStoreWaitFlolive(pageable, authInfo);
        Page<WaitRes> storeWaitResList = storeWaitList
                .map(o -> WaitRes.builder().order(o).build());
        log.info("사용자 번호(가게) {} 의 플로라이브 수락 대기 목록", authInfo.get("uId"));
        return new ResponseEntity<>(storeWaitResList, HttpStatus.OK);
    }

    @GetMapping("/confirm/users")
    public ResponseEntity<?> findUserConfirmFlolive(Pageable pageable) {
        Map<String, String> authInfo = SecurityUtil.getCurrentUser();
        Page<Order> userConfirmList = floliveService.findUserConfirmFlolive(pageable, authInfo);
        Page<ConfirmRes> userConfirmResList = userConfirmList
                .map(o -> ConfirmRes.builder().order(o).build());
        log.info("사용자 번호 {} 의 플로라이브 예정 목록", authInfo.get("uId"));
        return new ResponseEntity<>(userConfirmResList, HttpStatus.OK);
    }

    @GetMapping("/confirm/stores")
    public ResponseEntity<?> findStoreConfirmFlolive(Pageable pageable) {
        Map<String, String> authInfo = SecurityUtil.getCurrentUser();
        Page<Order> storeConfirmList = floliveService.findStoreConfirmFlolive(pageable, authInfo);
        Page<ConfirmRes> storeConfirmResList = storeConfirmList
                .map(o -> ConfirmRes.builder().order(o).build());
        log.info("사용자 번호(가게) 의 플로라이브 예정 목록", authInfo.get("uId"));
        return new ResponseEntity<>(storeConfirmResList, HttpStatus.OK);
    }

    @GetMapping("close/{oId}")
    public ResponseEntity<?> closeFlolive(@PathVariable Long oId) throws OpenViduJavaClientException, OpenViduHttpException {
        log.info("주문 번호 {} 화상회의 종료 시도", oId);
        floliveService.closeFlolive(oId);
        log.info("주문 번호 {} 화상회의 종료 성공", oId);
        return new ResponseEntity<>(HttpStatus.OK);
    }

}