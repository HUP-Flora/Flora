package com.ssafy.floraserver.common.exception;


import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;

@RequiredArgsConstructor
@Getter
public enum ErrorCode {

    CREATED(HttpStatus.CREATED, "CREATED"),
    UPDATED(HttpStatus.CREATED, "UPDATED"),

    USER_NOT_FOUND(HttpStatus.NOT_FOUND, "사용자를 찾을 수 없습니다."),
    STORE_NOT_FOUND(HttpStatus.NOT_FOUND, "가게를 찾을 수 없습니다."),
    PRODUCT_NOT_FOUND(HttpStatus.NOT_FOUND, "상품을 찾을 수 없습니다."),
    ORDER_NOT_FOUND(HttpStatus.NOT_FOUND, "주문을 찾을 수 없습니다."),
    CONFERENCE_NOT_FOUND(HttpStatus.NOT_FOUND, "화상미팅을 찾을 수 없습니다."),
    BOOKMARK_NOT_FOUND(HttpStatus.NOT_FOUND, "꽃갈피를 찾을 수 없습니다."),
    REVIEW_NOT_FOUND(HttpStatus.NOT_FOUND, "리뷰를 찾을 수 없습니다."),
    TIMEUNIT_NOT_FOUND(HttpStatus.NOT_FOUND, "시간 단위를 찾을 수 없습니다."),

    OPENVIDU_SESSION_EXISTS(HttpStatus.FORBIDDEN, "이미 생성된 화상미팅입니다."),
    OPENVIDU_SESSION_NOT_EXISTS(HttpStatus.FORBIDDEN, "존재하지 않는 화상미팅입니다."),
    ORDER_STATUS_CHANGE_NOT_ALLOWED(HttpStatus.FORBIDDEN, "주문 상태를 변경할 수 없습니다."),
    ORDER_CANCLE_NOT_ALLOWED(HttpStatus.FORBIDDEN, "취소할 수 없는 주문입니다."),
    CONFERENCE_ENTRY_NOT_ALLOWED(HttpStatus.FORBIDDEN, "입장할 수 없는 화상미팅입니다."),
    REPORT_EXISTS(HttpStatus.FORBIDDEN, "이미 신고된 주문입니다."),
    REFRESH_NOT_VALID(HttpStatus.UNAUTHORIZED, "리프레시 토큰이 유효하지 않습니다."),
    EXPIRED_TOKEN(HttpStatus.UNAUTHORIZED, "액세스 토큰이 만료되었습니다."),
    WRONG_TYPE_TOKEN(HttpStatus.UNAUTHORIZED, "토큰의 타입이 잘못되었습니다."),
    UNSUPPORTED_TOKEN(HttpStatus.UNAUTHORIZED, "지원하지 않는 토큰입니다."),
    WRONG_TOKEN(HttpStatus.UNAUTHORIZED, "잘못된 토큰입니다."),
    FILE_UPLOAD_FAIL(HttpStatus.CONFLICT, "파일 업로드에 실패했습니다.");

    private final HttpStatus status;
    private final String message;

}
