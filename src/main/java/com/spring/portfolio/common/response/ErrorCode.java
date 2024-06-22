package com.spring.portfolio.common.response;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public enum ErrorCode {
    DUPLICATE_USER(409, "이미 존재하는 사용자입니다."),
    USER_NOT_FOUND(404, "사용자를 찾을 수 없습니다."),
    INVALID_PASSWORD(401, "비밀번호가 일치하지 않습니다."),
    INTERNAL_SERVER_ERROR(500, "서버 에러가 발생했습니다.");

    private int statusCode;
    private String message;
}