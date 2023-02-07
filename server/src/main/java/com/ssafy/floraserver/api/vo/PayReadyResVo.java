package com.ssafy.floraserver.api.vo;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@Setter
@ToString
public class PayReadyResVo {

    // 결제 고유 번호
    private String tid;
    // 결제 요청 메시지 전송 여부
    private boolean tms_result;
    // 앱일 경우 결제 페이지
    private String next_redirect_app_url;
    // 모바일 웹일 경우 결제 페이지
    private String next_redirect_mobile_url;
    // PC일 경우 결제 페이지
    private String next_redirect_pc_url;
    // 결제 화면으로 이동
    private String android_app_scheme;
    private String ios_app_scheme;
    // 결제 준비 요청 시간
    private String created_at;

}
