package com.spring.portfolio.common.response;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public enum ErrorCode {
    DUPLICATE_USER_NAME(409, "이미 가입된 사용자 이름입니다."),
    INVALID_CREDENTIALS(401, "잘못된 사용자 이름 또는 비밀번호입니다."),
    NOT_FOUND(404, "페이지를 찾을 수 없습니다."),
    INTERNAL_SERVER_ERROR(500, "서버 에러가 발생했습니다.");

    private int statusCode;
    private String message;
}