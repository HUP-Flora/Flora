package com.ssafy.floraserver.api.service;

import com.ssafy.floraserver.api.request.ReceiptReq;
import com.ssafy.floraserver.db.entity.*;
import com.ssafy.floraserver.db.entity.enums.ConferenceStatus;
import com.ssafy.floraserver.db.entity.enums.OrderStatus;
import com.ssafy.floraserver.db.entity.enums.OrderType;
import com.ssafy.floraserver.db.repository.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDate;
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

    public void applyFlolive(Long sId, Map<String, String> authInfo) {

        // CUSTOMER인지 확인 @PreAuthorize
        // 가게 존재하는지 확인
        Long uId = Long.parseLong(authInfo.get("uId"));
        User user = userRepository.findById(uId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));

        Store store = storeRepository.findById(sId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));

        // conference 저장
//        Conference conference = conferenceRepository.save(
//                Conference.builder()
//                        .reservationDate(null)
//                        .reservationTime(null)
//                        .link(createConferenceLink())
//                        .status(ConferenceStatus.WAITING)
//                        .build()
//        );

        String orderNum = createOrderNum(LocalDate.now());

        Product defultProduct = productRepository.findById(Long.valueOf(1))
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));

        // order 저장 상품 X
        Order savedOrder = orderRepository.save(
                Order.builder()
                        .num(createOrderNum(LocalDate.now()))
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

        // conference 저장
        Conference conference = conferenceRepository.save(
                Conference.builder()
                        .reservationDate(null)
                        .reservationTime(null)
                        .link("") // 화상미팅 링크 생성 메소드
                        .status(ConferenceStatus.WAITING)
                        .build()
        );

        // order 저장 상품 O
        Order savedOrder = orderRepository.save(
                Order.builder()
                        .num(null) // 주문번호 생성 메소드
                        .date(LocalDate.now())
                        .status(OrderStatus.WAITING)
                        .type(OrderType.NOW)
                        .uId(user)
                        .sId(store)
                        .pId(product)
                        .conId(conference)
                        .build()
        );

    }

    public void acceptFlolive(Long conId, Map<String, String> authInfo) {
        // order 수정
        // conference 수정

    }

    public void refuseFlolive(Long conId, Map<String, String> authInfo) {
        // order 수정
        // conference 수정
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

    public String createConferenceLink(){
        // 랜덤 문자열 생성
        int leftLimit = 48; // numeral '0'
        int rightLimit = 122; // letter 'z'
        int targetStringLength = 10;
        Random random = new Random();

        String generatedString = random.ints(leftLimit,rightLimit + 1)
                .filter(i -> (i <= 57 || i >= 65) && (i <= 90 || i >= 97))
                .limit(targetStringLength)
                .collect(StringBuilder::new, StringBuilder::appendCodePoint, StringBuilder::append)
                .toString();
        System.out.println(generatedString);
        log.info("랜덤 문자열 생성 : {}", generatedString);
        return generatedString;
    }
}