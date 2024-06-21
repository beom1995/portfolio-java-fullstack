package com.spring.portfolio.common.response;

import lombok.Getter;

@Getter
public class ErrorResponse {
    private int statusCode;
    private String message;

    public ErrorResponse(ErrorCode errorCode, String message) {
        this.statusCode = errorCode.getStatusCode();
        this.message = message;
    }
}