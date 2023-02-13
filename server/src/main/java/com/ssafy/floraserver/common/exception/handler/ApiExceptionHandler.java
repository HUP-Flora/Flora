package com.ssafy.floraserver.common.exception.handler;

import com.ssafy.floraserver.common.exception.CustomException;
import com.ssafy.floraserver.common.exception.ErrorResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@Slf4j
@RestControllerAdvice
public class ApiExceptionHandler {

    @ExceptionHandler(value = CustomException.class)
    public ErrorResponse handleCustomException(CustomException e) {
        log.error("[handleCustomException] {} : {}" ,e.getErrorCode().name(), e.getErrorCode().getMessage());
        ErrorResponse response = ErrorResponse.of(e.getErrorCode());
        return response;
    }
}