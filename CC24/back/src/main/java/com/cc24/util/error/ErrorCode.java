package com.cc24.util.error;

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
    CANNOT_AUTHORIZE_MEMBER(BAD_REQUEST, "인증에 실패했습니다."),

    /* 500 INTERNAL_SERVER_ERROR : 서버 문제 발생 */
    DID_ERROR(INTERNAL_SERVER_ERROR, "did 처리 중 문제가 발생했습니다."),
    SIGN_ERROR(INTERNAL_SERVER_ERROR, "서명 중 문제가 발생했습니다.")
    ;

    private final HttpStatus httpStatus;
    private final String detail;
}
