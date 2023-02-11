package com.ssafy.floraserver.api.service;

import com.ssafy.floraserver.api.request.ReceiptReq;
import com.ssafy.floraserver.api.request.ReserveFloliveReq;
import com.ssafy.floraserver.api.response.ConferenceRes;
import com.ssafy.floraserver.db.entity.*;
import com.ssafy.floraserver.db.entity.enums.*;
import com.ssafy.floraserver.db.repository.*;
import io.openvidu.java.client.OpenViduHttpException;
import io.openvidu.java.client.OpenViduJavaClientException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDate;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Map;

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
    private final TimeUnitRepository timeUnitRepository;
    private final OpenViduService openViduService;

    public String applyFlolive(Long sId, Map<String, String> authInfo) {

        // CUSTOMER인지 확인 @PreAuthorize
        // 가게 존재하는지 확인
        Long uId = Long.parseLong(authInfo.get("uId"));

        User user = userRepository.findById(uId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
        log.info(user.toString());

        Store store = storeRepository.findById(sId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
        log.info(store.toString());

        String orderNum = createOrderNum(LocalDate.now());
        Product defultProduct = productRepository.findById(Long.valueOf(1))
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
        log.info(defultProduct.toString());
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
        log.info(savedOrder.toString());
        return orderNum;
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

        ConferenceRes conferenceRes = createFloliveRoom(String.valueOf(order.getNum()));
        conferenceRes.setUserRole(role);

        // conference 저장
        Conference conference = conferenceRepository.save(
                Conference.builder()
                        .reservationDate(LocalDate.now())
                        .reservationTime(null)
                        .startTime(LocalTime.now())
                        .link(null)
                        .sessionId(conferenceRes.getSessionId())
                        .token(conferenceRes.getConnectionToken())
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
        order.updateStatus(OrderStatus.REFUSE);
    }

    public ConferenceRes entryFlolive(Long conId, Map<String, String> authInfo) {
        // 요청한 사람이 customer인지 store인지
        String role = authInfo.get("role");

        // conId 화상미팅이 유효한지. 주문상태 ACCEPT, 화상미팅상태 WAITING인지
        Conference conference = conferenceRepository.findById(conId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));

        if (conference.getStatus() != ConferenceStatus.WAITING) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN);
        }

        // 화상미팅상태 가게 INPROGRESS로 변경
        Order order = orderRepository.findByConId(conId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));

        Store store = storeRepository.findById(order.getSId().getSId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));

        store.updateIsOnair(OnAirType.INPROGRESS);

        // 입장 안내
        ConferenceRes conferenceRes = new ConferenceRes(role, conference.getSessionId(), conference.getToken());
        return conferenceRes;
    }

    // 배송정보
    public void createReceipt(Long oId, ReceiptReq receiptReq, Map<String, String> authInfo) {
        Order order = orderRepository.findById(oId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));

        Receipt receipt = receiptRepository.save(
                Receipt.builder()
                        .type(receiptReq.getType())
                        .orderer(receiptReq.getOrderer())
                        .ordererPhoneNumber(receiptReq.getOrdererPhoneNumber())
                        .giftMessage(receiptReq.getGiftMessage())
                        .recipient(receiptReq.getRecipient())
                        .receipientPhoneNumber(receiptReq.getReceipientPhoneNumber())
                        .deliveryDestination(receiptReq.getDeliveryDestination())
                        .receiptDate(null)
                        .status(ReceiptStatus.UNDONE)
                        .build()
        );
    }

    public String storeCalendar(Long sId) {
        Store store = storeRepository.findById(sId)
                .orElseThrow(()-> new ResponseStatusException(HttpStatus.NOT_FOUND));
        return store.getHoliday();
    }

    public List<Order> storeDate(Long sId, String date) {
        DateTimeFormatter dateTimeFormatter = DateTimeFormatter.ofPattern("yyyy-mm-dd");
        LocalDate localDate = LocalDate.parse(date);
        log.info("String -> LocatDate type 변환 : {}", localDate);

        Store store = storeRepository.findById(sId)
                .orElseThrow(()-> new ResponseStatusException(HttpStatus.NOT_FOUND));
        log.info("Store-{} 정보 : {}", sId, store.toString());

        Long start = store.getStart().getTuId();
        Long end = store.getEnd().getTuId();
        log.info("Store-{} 영업 시간 정보 : {} - {}", sId, start, end);

        List<Order> orderList = orderRepository.findByDateAndSId(localDate, sId, start, end);
        log.info("Store-{}의 예약 불가능 시간 개수 : {}", sId, orderList.size());

        return orderList;
    }

    public String checkStatus(String orderNum) {
        Order order = orderRepository.findByNum(orderNum)
                .orElseThrow(()-> new ResponseStatusException(HttpStatus.NOT_FOUND));
        return order.getStatus().toString();
    }

    public void reserveFlolive(ReserveFloliveReq reserveFloliveReq, Map<String, String> authInfo) throws OpenViduJavaClientException, OpenViduHttpException {
        Long uId = Long.parseLong(authInfo.get("uId"));
        String role = authInfo.get("role");
        log.info("예약 정보 - sId : {} ", reserveFloliveReq.getSid());
        log.info("예약 정보 - pId : {} ", reserveFloliveReq.getPid());
        log.info("예약 정보 - reservationDate : {} ", reserveFloliveReq.getReservationDate());
        log.info("예약 정보 - reservationTime : {} ", reserveFloliveReq.getReservationTime());

        User user = userRepository.findById(uId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
        log.info(user.toString());

        Store store = storeRepository.findById(reserveFloliveReq.getSid())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
        log.info(store.toString());

        Product product = productRepository.findById(reserveFloliveReq.getPid())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
        log.info(product.toString());

        TimeUnit timeUnit = timeUnitRepository.findById(reserveFloliveReq.getReservationTime())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
        log.info(timeUnit.toString());

        DateTimeFormatter dateTimeFormatter = DateTimeFormatter.ofPattern("yyyy-mm-dd");
        LocalDate localDate = LocalDate.parse(reserveFloliveReq.getReservationDate());
        log.info("String -> LocatDate type 변환 : {}", localDate);

        String orderNum = createOrderNum(LocalDate.now());

        ConferenceRes conferenceRes = createFloliveRoom(orderNum);
        conferenceRes.setUserRole(role);

        // conference 저장
        Conference conference = conferenceRepository.save(
                Conference.builder()
                        .reservationDate(localDate)
                        .reservationTime(timeUnit)
                        .startTime(LocalTime.now())
                        .link(null)
                        .sessionId(conferenceRes.getSessionId())
                        .token(conferenceRes.getConnectionToken())
                        .status(ConferenceStatus.WAITING)
                        .build()
        );

        // order 저장 상품 O
        Order savedOrder = orderRepository.save(
                Order.builder()
                        .num(orderNum)
                        .date(LocalDate.now())
                        .status(OrderStatus.ACCEPT)
                        .type(OrderType.RESERVATION)
                        .uId(user)
                        .sId(store)
                        .pId(product)
                        .conId(null) // TODO 위에 conId랑 연결하기
                        .build()
        );
    }

    public Page<Order> findUserWaitFlolive(Pageable pageable, Map<String, String> authInfo) {
        Long uId = Long.parseLong(authInfo.get("uId"));
//        Long uId = Long.valueOf(31); // TODO 테스트용 uID, 나중에 지우기
        Page<Order> orderList = orderRepository.findByUId(uId, OrderStatus.WAITING, pageable);
        return orderList;
    }

    public Page<Order> findStoreWaitFlolive(Pageable pageable, Map<String, String> authInfo) {
        Long uId = Long.parseLong(authInfo.get("uId"));
//        Long uId = Long.valueOf(31); // TODO 테스트용 uID, 나중에 지우기
        Store store = storeRepository.findByUId(uId)
                .orElseThrow(()-> new ResponseStatusException(HttpStatus.NOT_FOUND));
        Page<Order> orderList = orderRepository.findBySId(store.getSId(), OrderStatus.WAITING, pageable);
        return orderList;
    }

    public Page<Order> findUserConfirmFlolive(Pageable pageable, Map<String, String> authInfo) {
        Long uId = Long.parseLong(authInfo.get("uId"));
//        Long uId = Long.valueOf(31); // TODO 테스트용 uID, 나중에 지우기
        Page<Order> confirmList = orderRepository.findByUIdAndConStatus(uId, ConferenceStatus.WAITING, pageable);
        return confirmList;
    }

    public Page<Order> findStoreConfirmFlolive(Pageable pageable, Map<String, String> authInfo) {
        Long uId = Long.parseLong(authInfo.get("uId"));
//        Long uId = Long.valueOf(31); // TODO 테스트용 uID, 나중에 지우기
        Store store = storeRepository.findByUId(uId)
                .orElseThrow(()-> new ResponseStatusException(HttpStatus.NOT_FOUND));
        Page<Order> orderList = orderRepository.findBySIdAndConStatus(store.getSId(), ConferenceStatus.WAITING, pageable);
        return orderList;
    }

    // 주분번호 : 날짜 + (DB 마지막 번호+1)
    public String createOrderNum(LocalDate today){
        String num = "";
        num += today.toString().replaceAll("-", "");
        Long lastOId = orderRepository.findLastOId();
        num += (lastOId + 1) + "";
        return num;
    }

    // 미팅 방 생성
    public ConferenceRes createFloliveRoom(String orderNum) throws OpenViduJavaClientException, OpenViduHttpException {
        String sessionId = openViduService.createSession(String.valueOf(orderNum));

        // 세션 ID, 토큰 생성
        String connectionToken = openViduService.createConnectionToken(sessionId);

        // 세션 ID, 토큰 반환
        return new ConferenceRes(null, sessionId, connectionToken);
    }

    // 미팅 방 종료
    public void closeFlolive(Long oId) throws OpenViduJavaClientException, OpenViduHttpException {
        Order order = orderRepository.findById(oId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));

        openViduService.closeSession(order.getConId().getSessionId());

        Conference conference = conferenceRepository.findById(order.getConId().getConId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));

        // 화상미팅상태 변경
        conference.updateStatus(ConferenceStatus.COMPLETED);
    }
}