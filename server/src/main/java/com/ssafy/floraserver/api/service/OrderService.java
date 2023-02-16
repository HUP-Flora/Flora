package com.ssafy.floraserver.api.service;

import com.ssafy.floraserver.api.response.OrderRes;
import com.ssafy.floraserver.api.response.StoreOrderRes;
import com.ssafy.floraserver.api.response.UserOrderRes;
import com.ssafy.floraserver.common.exception.CustomException;
import com.ssafy.floraserver.common.exception.ErrorCode;
import com.ssafy.floraserver.db.entity.Order;
import com.ssafy.floraserver.db.entity.Product;
import com.ssafy.floraserver.db.entity.Store;
import com.ssafy.floraserver.db.entity.enums.*;
import com.ssafy.floraserver.db.repository.OrderRepository;
import com.ssafy.floraserver.db.repository.ProductRepository;
import com.ssafy.floraserver.db.repository.ReceiptRepository;
import com.ssafy.floraserver.db.repository.StoreRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.Map;

@Service
@Slf4j
@Transactional
@RequiredArgsConstructor
public class OrderService {

    private final OrderRepository orderRepository;
    private final ReceiptRepository receiptRepository;
    private final StoreRepository storeRepository;
    private final ProductRepository productRepository;

    public Page<StoreOrderRes> findStoreOrderList(Pageable pageable, Map<String, String> authInfo) {

        Long uId = Long.parseLong(authInfo.get("uId"));

        // 로그인한 사용자의 가게를 가져온다
        Store store = storeRepository.findByUId(uId)
                .orElseThrow(() -> new CustomException(ErrorCode.STORE_NOT_FOUND));
        log.info(store.getName());

        Product defaultProduct = productRepository.findById(1L)
                .orElseThrow(() -> new CustomException(ErrorCode.PRODUCT_NOT_FOUND));

        Page<Order> orderList = orderRepository.findAllByStore(store.getSId(), pageable);

        Page<StoreOrderRes> storeOrderResList = orderList
                .map(o -> StoreOrderRes.builder()
                        .order(o)
                        .defaultProduct(defaultProduct)
                        .status(makeOrderResStatus(o))
                        .build());

        return storeOrderResList;
    }

    public Page<UserOrderRes> findUserOrderList(Pageable pageable, Map<String, String> authInfo) {

        Long uId = Long.parseLong(authInfo.get("uId"));

        Page<Order> orderList = orderRepository.findAllByUser(uId, pageable);

        Page<UserOrderRes> userOrderResList = orderList
                .map(o -> UserOrderRes.builder()
                        .order(o)
                        .status(makeOrderResStatus(o))
                        .build());

        return userOrderResList;
    }

    public OrderRes findOrder(Long oId, Map<String, String> authInfo) {

        Order order = orderRepository.findById(oId)
                .orElseThrow(() -> new CustomException(ErrorCode.ORDER_NOT_FOUND));

        OrderRes orderRes = OrderRes.builder()
                .order(order)
                .status(makeOrderResStatus(order))
                .build();

        return orderRes;
    }

    public int makeOrderResStatus(Order order){
//        if(order.getStatus().equals(OrderStatus.ACCEPT)
//                && order.getConId().getStatus().equals(ConferenceStatus.COMPLETED)
//                && order.getPaymentStatus().equals(PaymentStatus.UNDONE)
//                && order.getRecId().getStatus().equals(ReceiptStatus.UNDONE)){
//            return 0;
//        }
        // 픽업이면서 배송 완료인 경우
        if(order.getRecId().getType().equals(ReceiptType.PICKUP)
                && order.getStatus().equals(OrderStatus.COMPLETED)
                && order.getConId().getStatus().equals(ConferenceStatus.COMPLETED)
                && order.getPaymentStatus().equals(PaymentStatus.DONE)
                && order.getRecId().getStatus().equals(ReceiptStatus.DONE))
            return 5;

        if(order.getStatus().equals(OrderStatus.ACCEPT)
            && order.getConId().getStatus().equals(ConferenceStatus.COMPLETED)
            && order.getPaymentStatus().equals(PaymentStatus.DONE)
            && order.getRecId().getStatus().equals(ReceiptStatus.UNDONE)){
            return 1; // 결제완료
        }else if(order.getStatus().equals(OrderStatus.ACCEPT)
                && order.getConId().getStatus().equals(ConferenceStatus.COMPLETED)
                && order.getPaymentStatus().equals(PaymentStatus.DONE)
                && order.getRecId().getStatus().equals(ReceiptStatus.INPROGRESS)){
            return 2; // 배송중
        }else if(order.getStatus().equals(OrderStatus.COMPLETED)
                && order.getConId().getStatus().equals(ConferenceStatus.COMPLETED)
                && order.getPaymentStatus().equals(PaymentStatus.DONE)
                && order.getRecId().getStatus().equals(ReceiptStatus.DONE)){
            return 3; // 배송완료
        }
        else
        return 0;
    }

    public void changeOrderStatus(Long oId) {
        Order order = orderRepository.findById(oId)
                .orElseThrow(() -> new CustomException(ErrorCode.ORDER_NOT_FOUND));

        try {
            order.getStatus();
            order.getPaymentStatus();
            order.getRecId().getStatus();
            order.getRecId().getStatus();
        } catch(NullPointerException e) {
            throw new CustomException(ErrorCode.ORDER_NOT_FOUND);
        }

        OrderStatus orderStatus = order.getStatus();
        log.info("order status : {}", orderStatus);
        PaymentStatus paymentStatus = order.getPaymentStatus();
        log.info("payment status : {}", paymentStatus);
        ReceiptStatus receiptStatus = order.getRecId().getStatus();
        log.info("receipt status : {}", receiptStatus);

        ReceiptType receiptType = order.getRecId().getType();
        log.info("receipt type : {}", receiptType);

        if (receiptType == ReceiptType.PICKUP) {
            if (orderStatus == OrderStatus.REFUSE || orderStatus == OrderStatus.WAITING || orderStatus == OrderStatus.COMPLETED) {
                log.info("주문 상태를 변경할 수 없는 주문입니다 : {}", orderStatus);
                throw new CustomException(ErrorCode.ORDER_STATUS_CHANGE_NOT_ALLOWED);
            } else if (paymentStatus == PaymentStatus.UNDONE) {
                log.info("주문 상태 픽업 완료로 변경 요청 실패 : 결제 미완료");
                throw new CustomException(ErrorCode.ORDER_STATUS_CHANGE_NOT_ALLOWED);
            } else if (paymentStatus == PaymentStatus.DONE && orderStatus == OrderStatus.ACCEPT && receiptStatus == ReceiptStatus.UNDONE) {
                order.getRecId().updateStatus(ReceiptStatus.DONE);
                log.info("주문 상태 픽업 완료로 변경 완료");
            } else {
                log.info("주문 상태를 변경할 수 없습니다.");
                throw new CustomException(ErrorCode.ORDER_STATUS_CHANGE_NOT_ALLOWED);
            }
        } else {
            if (orderStatus == OrderStatus.REFUSE || orderStatus == OrderStatus.WAITING || orderStatus == OrderStatus.COMPLETED) {
                log.info("주문 상태를 변경할 수 없는 주문입니다 : {}", orderStatus);
                throw new CustomException(ErrorCode.ORDER_STATUS_CHANGE_NOT_ALLOWED);
            } else if (paymentStatus == PaymentStatus.UNDONE) {
                log.info("주문 상태 배송중으로 변경 요청 실패 : 결제 미완료");
                throw new CustomException(ErrorCode.ORDER_STATUS_CHANGE_NOT_ALLOWED);
            } else if (paymentStatus == PaymentStatus.DONE && orderStatus == OrderStatus.ACCEPT && receiptStatus != ReceiptStatus.INPROGRESS){
                order.getRecId().updateStatus(ReceiptStatus.INPROGRESS);
                log.info("주문 상태 배송중으로 변경 완료");
            } else if (receiptStatus == ReceiptStatus.INPROGRESS) {
                order.updateStatus(OrderStatus.COMPLETED);
                order.getRecId().updateStatus(ReceiptStatus.DONE);
                order.getRecId().updatereceiptDate(LocalDate.now());
                log.info("주문 상태 배송완료로 변경 완료");
            } else {
                log.info("주문 상태를 변경할 수 없습니다.");
                throw new CustomException(ErrorCode.ORDER_STATUS_CHANGE_NOT_ALLOWED);
            }
        }
    }
}
