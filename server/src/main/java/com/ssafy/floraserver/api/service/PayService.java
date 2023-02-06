package com.ssafy.floraserver.api.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.floraserver.api.vo.PayAppResVo;
import com.ssafy.floraserver.api.vo.PayReadyResVo;
import com.ssafy.floraserver.db.entity.Order;
import com.ssafy.floraserver.db.repository.OrderRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.*;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.ProtocolException;
import java.net.URL;
import java.util.Optional;

@Service
@Slf4j
@Transactional
@RequiredArgsConstructor
public class PayService {

    private static final String HOST = "https://kapi.kakao.com";
    private static final String READY = HOST + "/v1/payment/ready";
    private static final String APPROVE = HOST + "/v1/payment/approve";
    private final OrderRepository orderRepository;
    private Optional<Order> order = null;

    @Value("${kakao-pay.client-id}")
    private String client_id;
    @Value("${kakao-pay.domain}")
    private String domain;

    public PayReadyResVo payReady(Long oId) {

        ObjectMapper mapper = new ObjectMapper();

        try {
            URL url = new URL(READY);
            HttpURLConnection conn = (HttpURLConnection) url.openConnection();
            conn.setRequestMethod("POST");
            conn.setRequestProperty("Authorization", client_id);
            conn.setRequestProperty("Content-Type", "application/x-www-form-urlencoded;charset=utf-8");
            conn.setDoOutput(true);
            
            // 주문 번호에 대한 값 찾기
            if (oId != null) {
                order = orderRepository.findById(oId);
            }

            // 파라미터 생성
            String param = "cid=TC0ONETIME&partner_order_id=" + order.get().getOId() +
                    "&partner_user_id=" + order.get().getSId().getSId() +
                    "&item_name=" + order.get().getPId().getName() +
                    "&quantity=1" +
                    "&total_amount=" + order.get().getPayment() +
                    "&tax_free_amount=0" +
                    "&approval_url=" + domain + "approval" +
                    "&cancel_url=" + domain + "cancel" +
                    "&fail_url=" + domain + "fail";

            System.out.println(param);

            OutputStream output = conn.getOutputStream();
            DataOutputStream dataOutput = new DataOutputStream(output);
            dataOutput.writeBytes(param);
            dataOutput.close();

            int res = conn.getResponseCode();
            InputStream input;

            if (res == 200) {
                input = conn.getInputStream();
            } else {
                input = conn.getErrorStream();
            }

            InputStreamReader inputStreamReader = new InputStreamReader(input);
            BufferedReader br = new BufferedReader(inputStreamReader);
            PayReadyResVo payReadyResVo = mapper.readValue(br.readLine(), PayReadyResVo.class);

            System.out.println(payReadyResVo.getNext_redirect_pc_url());

            // order에 결제 번호 세팅
            System.out.println(payReadyResVo.getTid());
            System.out.println(order.get().getUId());

            return payReadyResVo;

        } catch (ProtocolException e) {
            e.printStackTrace();
        } catch (MalformedURLException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
        return null;
    }

    public int payApproval(PayReadyResVo payReadyResVo, String pg_token) {
        int res = 0;
        try {
            URL url = new URL(APPROVE);
            HttpURLConnection conn = (HttpURLConnection) url.openConnection();
            conn.setRequestMethod("POST");
            conn.setRequestProperty("Authorization", client_id);
            conn.setRequestProperty("Content-Type", "application/x-www-form-urlencoded;charset=utf-8");
            conn.setDoOutput(true);

            // 파라미터 생성
            String param = "cid=TC0ONETIME&tid=" + payReadyResVo.getTid() +
                    "&partner_order_id=" + order.get().getOId() +
                    "&partner_user_id=" + order.get().getUId().getUId() +
                    "&pg_token=" + pg_token;

            OutputStream output = conn.getOutputStream();
            DataOutputStream dataOutput = new DataOutputStream(output);
            dataOutput.writeBytes(param);
            dataOutput.close();

            res = conn.getResponseCode();
            InputStream input;
            System.out.println(res);

            if (res == 200) {
                // 결제 완료 여부 변경 : DONE(ENUM)
                System.out.println("DONE");
            } else {
                input = conn.getErrorStream();
            }
            return res;

        } catch (ProtocolException e) {
            e.printStackTrace();
        } catch (MalformedURLException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
        return res;
    }
}
