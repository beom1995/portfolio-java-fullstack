package com.spring.portfolio.common.advice;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.spring.portfolio.common.response.ErrorCode;
import com.spring.portfolio.common.response.ErrorResponse;
import com.spring.portfolio.user.exception.DuplicateUserNameException;
import com.spring.portfolio.user.exception.InvalidPasswordException;
import com.spring.portfolio.user.exception.UserNotFoundException;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(DuplicateUserNameException.class)
    public ResponseEntity<ErrorResponse> handleDuplicateUserException(DuplicateUserNameException ex) {
        ErrorResponse errorResponse = new ErrorResponse(ErrorCode.DUPLICATE_USER, ex.getMessage());
        return ResponseEntity.status(ErrorCode.DUPLICATE_USER.getStatusCode()).body(errorResponse);
    }

    @ExceptionHandler(UserNotFoundException.class)
    public ResponseEntity<ErrorResponse> handleUserNotFoundException(UserNotFoundException ex) {
        ErrorResponse errorResponse = new ErrorResponse(ErrorCode.USER_NOT_FOUND, ex.getMessage());
        return ResponseEntity.status(ErrorCode.USER_NOT_FOUND.getStatusCode()).body(errorResponse);
    }

    @ExceptionHandler(InvalidPasswordException.class)
    public ResponseEntity<ErrorResponse> handleInvalidPasswordException(InvalidPasswordException ex) {
        ErrorResponse errorResponse = new ErrorResponse(ErrorCode.INVALID_PASSWORD, ex.getMessage());
        return ResponseEntity.status(ErrorCode.INVALID_PASSWORD.getStatusCode()).body(errorResponse);
    }

 
}