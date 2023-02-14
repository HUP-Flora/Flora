package com.ssafy.floraserver.api.service;

import com.ssafy.floraserver.api.request.ReceiptReq;
import com.ssafy.floraserver.api.request.ReserveFloliveReq;
import com.ssafy.floraserver.api.response.ConferenceRes;
import com.ssafy.floraserver.api.response.ReserveRes;
import com.ssafy.floraserver.common.exception.CustomException;
import com.ssafy.floraserver.common.exception.ErrorCode;
import com.ssafy.floraserver.db.entity.*;
import com.ssafy.floraserver.db.entity.enums.*;
import com.ssafy.floraserver.db.repository.*;
import io.openvidu.java.client.OpenViduHttpException;
import io.openvidu.java.client.OpenViduJavaClientException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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

    public Long applyFlolive(Long sId, Map<String, String> authInfo) {

        // CUSTOMER인지 확인 @PreAuthorize
        // 가게 존재하는지 확인
        Long uId = Long.parseLong(authInfo.get("uId"));

        User user = userRepository.findById(uId)
                .orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND));
        log.info("user 정보가 있습니다 : ", user.toString());

        Store store = storeRepository.findById(sId)
                .orElseThrow(() -> new CustomException(ErrorCode.STORE_NOT_FOUND));
        log.info("store 정보가 있습니다 : ", store.toString());

        String orderNum = createOrderNum(LocalDate.now());
        Product defultProduct = productRepository.findById(Long.valueOf(1))
                .orElseThrow(() -> new CustomException(ErrorCode.PRODUCT_NOT_FOUND));
        log.info("defultProduct 정보가 있습니다 : ", defultProduct.toString());
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
        log.info("order에 데이터가 저장되었습니다: {}",savedOrder.toString());

        return savedOrder.getOId();
    }

    public Long applyFloliveProduct(Long pId, Map<String, String> authInfo) {

        // CUSTOMER인지 확인 @PreAuthorize
        // 가게 존재하는지 확인
        Long uId = Long.parseLong(authInfo.get("uId"));
        User user = userRepository.findById(uId)
                .orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND));

        Product product = productRepository.findById(pId)
                .orElseThrow(() -> new CustomException(ErrorCode.PRODUCT_NOT_FOUND));

        if(product.getSId() == null) throw new CustomException(ErrorCode.PRODUCT_NOT_FOUND);

        Store store = storeRepository.findById(product.getSId().getSId())
                .orElseThrow(() -> new CustomException(ErrorCode.STORE_NOT_FOUND));

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

        return savedOrder.getOId();
    }

    // 취소
    public void deleteFlolive(Long oId, Map<String, String> authInfo) {
        Order order = orderRepository.findById(oId)
                .orElseThrow(() -> new CustomException(ErrorCode.ORDER_NOT_FOUND));

        if(order.getStatus() != OrderStatus.WAITING) {
            log.info("취소할 수 없는 주문입니다.");
            throw new CustomException(ErrorCode.ORDER_CANCLE_NOT_ALLOWED);
        }
        orderRepository.deleteById(oId);
    }

    // 수락
    public ConferenceRes acceptFlolive(Long oId, Map<String, String> authInfo) throws OpenViduJavaClientException, OpenViduHttpException {
        // order status 수정
        Order order = orderRepository.findById(oId)
                .orElseThrow(() -> new CustomException(ErrorCode.ORDER_NOT_FOUND));
        order.updateStatus(OrderStatus.ACCEPT);

        String role = authInfo.get("role");
        log.info("유저 정보 : {}",role);

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

        order.updateConference(conference);
        // 유저 타입, 세션 ID, 토큰 반환
        return conferenceRes;
    }

    public void refuseFlolive(Long oId, Map<String, String> authInfo) {
        // order 수정
        Order order = orderRepository.findById(oId)
                .orElseThrow(() -> new CustomException(ErrorCode.ORDER_NOT_FOUND));
        order.updateStatus(OrderStatus.REFUSE);
    }

    public ConferenceRes entryFlolive(Long conId, Map<String, String> authInfo) {
        // 요청한 사람이 customer인지 store인지
        String role = authInfo.get("role");

        // conId 화상미팅이 유효한지. 주문상태 ACCEPT, 화상미팅상태 WAITING인지
        Conference conference = conferenceRepository.findById(conId)
                .orElseThrow(() -> new CustomException(ErrorCode.CONFERENCE_NOT_FOUND));

        if (conference.getStatus() != ConferenceStatus.WAITING) {
            throw new CustomException(ErrorCode.CONFERENCE_ENTRY_NOT_ALLOWED);
        }

        // 화상미팅상태 가게 INPROGRESS로 변경
        Order order = orderRepository.findByConId(conId)
                .orElseThrow(() -> new CustomException(ErrorCode.ORDER_NOT_FOUND));

        Store store = storeRepository.findById(order.getSId().getSId())
                .orElseThrow(() -> new CustomException(ErrorCode.STORE_NOT_FOUND));

        store.updateIsOnair(OnAirType.INPROGRESS);
        conference.updateStatus(ConferenceStatus.INPROGRESS);

        // 입장 안내
        ConferenceRes conferenceRes = new ConferenceRes(role, conference.getSessionId(), conference.getToken());
        return conferenceRes;
    }

    // 배송정보
    public void createReceipt(Long oId, ReceiptReq receiptReq, Map<String, String> authInfo) {
        Order order = orderRepository.findById(oId)
                .orElseThrow(() -> new CustomException(ErrorCode.ORDER_NOT_FOUND));

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

        order.updatePayment(receiptReq.getPayment());
    }

    public String storeCalendar(Long sId) {
        Store store = storeRepository.findById(sId)
                .orElseThrow(()-> new CustomException(ErrorCode.STORE_NOT_FOUND));
        return store.getHoliday();
    }

    public List<Order> storeDate(Long sId, String date) {
        DateTimeFormatter dateTimeFormatter = DateTimeFormatter.ofPattern("yyyy-mm-dd");
        LocalDate localDate = LocalDate.parse(date);
        log.info("String -> LocatDate type 변환 : {}", localDate);

        Store store = storeRepository.findById(sId)
                .orElseThrow(()-> new CustomException(ErrorCode.STORE_NOT_FOUND));
        log.info("Store-{} 정보 : {}", sId, store.toString());

        Long start = store.getStart().getTuId();
        Long end = store.getEnd().getTuId();
        log.info("Store-{} 영업 시간 정보 : {} - {}", sId, start, end);

        List<Order> orderList = orderRepository.findByDateAndSId(localDate, sId, start, end);
        log.info("Store-{}의 예약 불가능 시간 개수 : {}", sId, orderList.size());

        return orderList;
    }

    public Order checkStatus(Long oId) {
        Order order = orderRepository.findById(oId)
                .orElseThrow(()-> new CustomException(ErrorCode.ORDER_NOT_FOUND));
        return order;
    }

    public ReserveRes reserveFlolive(ReserveFloliveReq reserveFloliveReq, Map<String, String> authInfo) throws OpenViduJavaClientException, OpenViduHttpException {
        Long uId = Long.parseLong(authInfo.get("uId"));
        String role = authInfo.get("role");
        log.info("예약 정보 - sId : {} ", reserveFloliveReq.getSid());
        log.info("예약 정보 - pId : {} ", reserveFloliveReq.getPid());
        log.info("예약 정보 - reservationDate : {} ", reserveFloliveReq.getReservationDate());
        log.info("예약 정보 - reservationTime : {} ", reserveFloliveReq.getReservationTime());

        User user = userRepository.findById(uId)
                .orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND));
        log.info("user 정보가 있습니다 : ", user.toString());

        Store store = storeRepository.findById(reserveFloliveReq.getSid())
                .orElseThrow(() -> new CustomException(ErrorCode.STORE_NOT_FOUND));
        log.info("store 정보가 있습니다 : ", store.toString());

        Product product = productRepository.findById(reserveFloliveReq.getPid())
                .orElseThrow(() -> new CustomException(ErrorCode.PRODUCT_NOT_FOUND));
        log.info("product 정보가 있습니다 : ", product.toString());

        TimeUnit timeUnit = timeUnitRepository.findById(reserveFloliveReq.getReservationTime())
                .orElseThrow(() -> new CustomException(ErrorCode.TIMEUNIT_NOT_FOUND));
        log.info("timeUnit 정보가 있습니다 : ", timeUnit.toString());

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

        log.info("플로라이브 입장 번호 : {}", String.valueOf(conference.getConId()));

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
                        .conId(conference)
                        .build()
        );

        return ReserveRes.builder()
                .oId(savedOrder.getOId())
                .sImg(store.getImgPath())
                .build();
    }

    public Page<Order> findUserWaitFlolive(Pageable pageable, Map<String, String> authInfo) {
        Long uId = Long.parseLong(authInfo.get("uId"));
        Page<Order> orderList = orderRepository.findByUId(uId, OrderStatus.WAITING, pageable);
        return orderList;
    }

    public Page<Order> findStoreWaitFlolive(Pageable pageable, Map<String, String> authInfo) {
        Long uId = Long.parseLong(authInfo.get("uId"));
        Store store = storeRepository.findByUId(uId)
                .orElseThrow(()-> new CustomException(ErrorCode.STORE_NOT_FOUND));
        log.info("가게 번호 : {}", String.valueOf(store.getSId()));
        Page<Order> orderList = orderRepository.findBySId(store.getSId(), OrderStatus.WAITING, OrderType.NOW, pageable);
        log.info("수락 대기 목록 개수 : {}", String.valueOf(orderList.getTotalElements()));
        return orderList;
    }

    public Page<Order> findUserConfirmFlolive(Pageable pageable, Map<String, String> authInfo) {
        Long uId = Long.parseLong(authInfo.get("uId"));

        LocalDate date = LocalDate.now();
        LocalTime time = LocalTime.now();

        log.info("현재 날짜 : {}",String.valueOf(date));
        String slocalTime = String.valueOf(time);

        List<TimeUnit> timeUnitList = timeUnitRepository.findByTime(slocalTime, PageRequest.of(0, 1));
        log.info("예약 시각 : {}", String.valueOf(timeUnitList.get(0).getTime()));

        Page<Order> confirmList = orderRepository.findByUIdAndConStatus(uId, OrderStatus.ACCEPT, ConferenceStatus.WAITING, date, timeUnitList.get(0).getTuId(), pageable);
        return confirmList;
    }

    public Page<Order> findStoreConfirmFlolive(Pageable pageable, Map<String, String> authInfo) {
        Long uId = Long.parseLong(authInfo.get("uId"));
        Store store = storeRepository.findByUId(uId)
                .orElseThrow(()-> new CustomException(ErrorCode.STORE_NOT_FOUND));

        LocalDate date = LocalDate.now();
        LocalTime time = LocalTime.now();

        String slocalTime = String.valueOf(time);

        List<TimeUnit> timeUnitList = timeUnitRepository.findByTime(slocalTime, PageRequest.of(0, 1));
        log.info("예약 시각 : {}", String.valueOf(timeUnitList.get(0).getTime()));

        Page<Order> orderList = orderRepository.findBySIdAndConStatus(store.getSId(), ConferenceStatus.WAITING, date, timeUnitList.get(0).getTuId(), pageable);
        return orderList;
    }

    // 주분번호 : 날짜 + (DB 마지막 번호+1)
    public String createOrderNum(LocalDate today){
        String num = "";
        num += today.toString().replaceAll("-", "");
        Long lastOId = orderRepository.findLastOId();
        if(lastOId == null) {
            log.info("order에 데이터가 없습니다.");
            lastOId = Long.valueOf(0);
        }
        num += (lastOId + 1) + "";
        log.info("create order num : {}", num);
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
                .orElseThrow(() -> new CustomException(ErrorCode.ORDER_NOT_FOUND));

        openViduService.closeSession(order.getConId().getSessionId());

        Conference conference = conferenceRepository.findById(order.getConId().getConId())
                .orElseThrow(() -> new CustomException(ErrorCode.CONFERENCE_NOT_FOUND));

        // 화상미팅상태 변경
        conference.updateStatus(ConferenceStatus.COMPLETED);
    }

    public boolean checkEntry (LocalTime localTime, String slocalTime, Order order) {
        log.info("현재 시각 : {}", slocalTime);

        List<TimeUnit> timeUnitList = timeUnitRepository.findByTime(slocalTime, PageRequest.of(0, 1));
        log.info("예약 시각 : {}", String.valueOf(timeUnitList.get(0).getTime()));

        // 화상미팅 입장 가능 여부 확인\
        String[] temp = order.getConId().getReservationTime().getTime().split(":");

        int reserveHour = Integer.parseInt(temp[0]);
        int nowHour = Integer.parseInt(String.valueOf(localTime.getHour()));
        int reserveMinute = Integer.parseInt(temp[1]);
        int nowMinute = Integer.parseInt(String.valueOf(localTime.getMinute()));
        log.info("예약 시각 - {}:{} , 현재 시각 - {}:{}", String.valueOf(reserveHour), String.valueOf(reserveMinute),
                String.valueOf(nowHour), String.valueOf(nowMinute));

        if(nowHour < reserveHour) {
            int diff = nowMinute - reserveMinute;
            if(diff >= 50 || diff == 0) {
                log.info("예약 시 > 현재 시, 입장 가능 : {}", diff);
                return true;
            } else {
                log.info("예약 시 > 현재 시, 입장 불가능 : {}", diff);
                return false;
            }
        } else if(nowHour == reserveHour) {
            int diff = reserveMinute - nowMinute;
            if (0 <= diff && diff <= 10) {
                log.info("예약 시 = 현재 시, 입장 가능 : {}", diff);
                return true;
            } else{
                log.info("예약 시 = 현재 시, 입장 불가능 : {}", diff);
                return false;
            }
        } else {
            log.info("예약 시 < 현재 시, 입장 불가능");
            return false;
        }
    }
}