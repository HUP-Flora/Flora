package com.ssafy.floraserver.api.service;

import com.ssafy.floraserver.api.response.OrderRes;
import com.ssafy.floraserver.api.response.StoreOrderRes;
import com.ssafy.floraserver.api.response.UserOrderRes;
import com.ssafy.floraserver.db.entity.Store;
import com.ssafy.floraserver.db.entity.enums.ConferenceStatus;
import com.ssafy.floraserver.db.entity.enums.OrderStatus;
import com.ssafy.floraserver.db.entity.enums.PaymentStatus;
import com.ssafy.floraserver.db.entity.enums.ReceiptStatus;
import com.ssafy.floraserver.db.repository.ReceiptRepository;
import com.ssafy.floraserver.db.entity.Order;
import com.ssafy.floraserver.db.entity.Receipt;
import com.ssafy.floraserver.db.repository.OrderRepository;
import com.ssafy.floraserver.db.repository.StoreRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.util.Map;

@Service
@Slf4j
@Transactional
@RequiredArgsConstructor
public class OrderService {

    private final OrderRepository orderRepository;
    private final ReceiptRepository receiptRepository;
    private final StoreRepository storeRepository;

    public Page<StoreOrderRes> findStoreOrderList(Pageable pageable, Map<String, String> authInfo) {

        Long uId = Long.parseLong(authInfo.get("uId"));

        // 로그인한 사용자의 가게를 가져온다
        Store store = storeRepository.findByUId(uId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
        log.info(store.getName());
        if(uId != store.getUId().getUId()){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }

        Page<Order> orderList = orderRepository.findAllByStore(store.getSId(), pageable);

        Page<StoreOrderRes> storeOrderResList = orderList
                .map(o -> StoreOrderRes.builder()
                        .order(o)
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
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));

        OrderRes orderRes = OrderRes.builder()
                .order(order)
                .status(makeOrderResStatus(order))
                .build();

        return orderRes;
    }

    public int makeOrderResStatus(Order order){
        if(order.getStatus().equals(OrderStatus.ACCEPT)
                && order.getConId().getStatus().equals(ConferenceStatus.COMPLETED)
                && order.getPaymentStatus().equals(PaymentStatus.UNDONE)
                && order.getRecId().getStatus().equals(ReceiptStatus.UNDONE)){
            return 0;
        }
        else if(order.getStatus().equals(OrderStatus.ACCEPT)
                && order.getConId().getStatus().equals(ConferenceStatus.COMPLETED)
                && order.getPaymentStatus().equals(PaymentStatus.DONE)
                && order.getRecId().getStatus().equals(ReceiptStatus.UNDONE)){
            return 1;
        }else if(order.getStatus().equals(OrderStatus.ACCEPT)
                && order.getConId().getStatus().equals(ConferenceStatus.COMPLETED)
                && order.getPaymentStatus().equals(PaymentStatus.DONE)
                && order.getRecId().getStatus().equals(ReceiptStatus.INPROGRESS)){
            return 2;
        }else if(order.getStatus().equals(OrderStatus.ACCEPT)
                && order.getConId().getStatus().equals(ConferenceStatus.COMPLETED)
                && order.getPaymentStatus().equals(PaymentStatus.DONE)
                && order.getRecId().getStatus().equals(ReceiptStatus.DONE)){
            return 3;
        }
        return -1;
    }
}
