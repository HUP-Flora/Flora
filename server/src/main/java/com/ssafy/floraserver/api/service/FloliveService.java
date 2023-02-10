package com.ssafy.floraserver.api.service;

import com.ssafy.floraserver.api.request.ReceiptReq;
import com.ssafy.floraserver.api.response.ConferenceRes;
import com.ssafy.floraserver.db.entity.*;
import com.ssafy.floraserver.db.entity.enums.ConferenceStatus;
import com.ssafy.floraserver.db.entity.enums.OrderStatus;
import com.ssafy.floraserver.db.entity.enums.OrderType;
import com.ssafy.floraserver.db.entity.enums.PaymentStatus;
import com.ssafy.floraserver.db.repository.*;
import io.openvidu.java.client.OpenViduHttpException;
import io.openvidu.java.client.OpenViduJavaClientException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.Map;
import java.util.Random;

@Service
@Slf4j
@RequiredArgsConstructor
@Transactional
public class FloliveService {

    private final OrderRepository orderRepository;
    private final ConferenceRepository conferenceRepository;
    private final ReceiptRepository receiptRepository;
    private final StoreRepository storeRepository;
    private final ProductRepository productRepository;
    private final UserRepository userRepository;
    private final OpenViduService openViduService;

    public void applyFlolive(Long sId, Map<String, String> authInfo) {

        // CUSTOMER인지 확인 @PreAuthorize
        // 가게 존재하는지 확인
        Long uId = Long.parseLong(authInfo.get("uId"));
        User user = userRepository.findById(uId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));

        Store store = storeRepository.findById(sId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));

        String orderNum = createOrderNum(LocalDate.now());

        Product defultProduct = productRepository.findById(Long.valueOf(1))
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));

        // order 저장 상품 X
        Order savedOrder = orderRepository.save(
                Order.builder()
                        .num(orderNum)
                        .date(LocalDate.now())
                        .status(OrderStatus.WAITING)
                        .type(OrderType.NOW)
                        .uId(user)
                        .sId(store)
                        .pId(defultProduct)
                        .conId(null)
                        .build()
        );
    }

    public void applyFloliveProduct(Long pId, Map<String, String> authInfo) {

        // CUSTOMER인지 확인 @PreAuthorize
        // 가게 존재하는지 확인
        Long uId = Long.parseLong(authInfo.get("uId"));
        User user = userRepository.findById(uId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));

        Product product = productRepository.findById(pId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));

        Store store = storeRepository.findById(product.getSId().getSId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));

        String orderNum = createOrderNum(LocalDate.now());

        // order 저장 상품 O
        Order savedOrder = orderRepository.save(
                Order.builder()
                        .num(orderNum)
                        .date(LocalDate.now())
                        .status(OrderStatus.WAITING)
                        .type(OrderType.NOW)
                        .uId(user)
                        .sId(store)
                        .pId(product)
                        .conId(null)
                        .build()
        );
    }

    // 수락
    public ConferenceRes acceptFlolive(Long oId, Map<String, String> authInfo) throws OpenViduJavaClientException, OpenViduHttpException {
        // order status 수정
        Order order = orderRepository.findById(oId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
        order.updateStatus(OrderStatus.ACCEPT);

        String role = authInfo.get("role");

        ConferenceRes conferenceRes = createFloliveRoom(String.valueOf(oId));
        conferenceRes.setUserRole(role);

//        TimeUnit timeUnit = TimeUnitRepository

        // conference 저장
        Conference conference = conferenceRepository.save(
                Conference.builder()
                        .reservationDate(LocalDate.now())
                        .reservationTime(null) // TODO : 타임 유닛 설정?
                        .startTime(LocalTime.now())
                        .link(conferenceRes.getSessionId()+"+"+conferenceRes.getConnectionToken())
                        .status(ConferenceStatus.WAITING)
                        .build()
        );

        // 유저 타입, 세션 ID, 토큰 반환
        return conferenceRes;
    }

    public void refuseFlolive(Long oId, Map<String, String> authInfo) {
        // order 수정
        Order order = orderRepository.findById(oId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
        order.updateStatus(OrderStatus.ACCEPT);
    }

    public void entryFlolive(Long conId, Map<String, String> authInfo) {
        // 요청한 사람이 customer인지 store인지
        // conId 화상미팅이 유효한지. 주문상태 ACCEPT, 화상미팅상태 WAITING인지

        // 입장하고 화상미팅상태 가게 INPROGRESS로 변경
    }

    public void createReceipt(ReceiptReq receiptReq, Map<String, String> authInfo) {
    }

    // 주분번호 : 날짜 + (DB 마지막 번호+1)
    public String createOrderNum(LocalDate today){
        String num = "";
        num += today.toString().replaceAll("-", "");
        Long lastOId = orderRepository.findLastOId();
        num += (lastOId + 1) + "";
        return num;
    }

    public ConferenceRes createFloliveRoom(String oId) throws OpenViduJavaClientException, OpenViduHttpException {
        String sessionId = openViduService.createSession(String.valueOf(oId));

        // 세션 ID, 토큰 생성
        String connectionToken = openViduService.createConnectionToken(sessionId);

        // 세션 ID, 토큰 반환
        return new ConferenceRes(null, sessionId, connectionToken);
    }
}