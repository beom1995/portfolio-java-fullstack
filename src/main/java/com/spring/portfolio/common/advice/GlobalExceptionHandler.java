package com.spring.portfolio.common.advice;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.spring.portfolio.common.response.ErrorCode;
import com.spring.portfolio.common.response.ErrorResponse;
import com.spring.portfolio.user.exception.DuplicateUserNameException;

import lombok.extern.slf4j.Slf4j;

@RestControllerAdvice
@Slf4j
public class GlobalExceptionHandler {

    @ExceptionHandler(DuplicateUserNameException.class)
    public ResponseEntity<ErrorResponse> handleDuplicateUserNameException(DuplicateUserNameException ex) {
        log.error("DuplicateUserNameException occurred: {}", ex.getMessage());
        ErrorCode errorCode = ErrorCode.DUPLICATE_USER_NAME;
        return ResponseEntity
                .status(errorCode.getStatusCode())
                .body(new ErrorResponse(errorCode));
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorResponse> handleException(Exception ex) {
        log.error("Unexpected exception occurred: {}", ex.getMessage());
        ErrorCode errorCode = ErrorCode.INTERNAL_SERVER_ERROR;
        return ResponseEntity
                .status(errorCode.getStatusCode())
                .body(new ErrorResponse(errorCode));
    }
}