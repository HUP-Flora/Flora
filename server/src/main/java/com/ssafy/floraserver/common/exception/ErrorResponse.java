package com.ssafy.floraserver.common.exception;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.http.HttpStatus;

@Getter
@Setter
@NoArgsConstructor
public class ErrorResponse {

    private String name;
    private int status;
    private String message;

    public ErrorResponse(ErrorCode code) {
        this.name = code.name();
        this.status = code.getStatus().value();
        this.message = code.getMessage();
    }

    public static ErrorResponse of(ErrorCode code) {
        return new ErrorResponse(code);
    }
}