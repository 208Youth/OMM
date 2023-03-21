package com.omm.util.error;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

import static org.springframework.http.HttpStatus.*;

@Getter
@AllArgsConstructor
public enum ErrorCode {
    /* 404 NOT_FOUND : Resource 를 찾을 수 없음 */
    MEMBER_NOT_FOUND(NOT_FOUND, "없는 사용자입니다."),

    /* 400 BAD_REQUEST : 잘못된 요청 */
    CANNOT_AUTHORIZE_MEMBER(BAD_REQUEST, "인증에 실패했습니다.")
    ;
    private final HttpStatus httpStatus;
    private final String detail;
}
