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
    PAGE_NOT_FOUND(NOT_FOUND, "존재하지 않은 페이지입니다."),

    /* 400 BAD_REQUEST : 잘못된 요청 */
    CANNOT_AUTHORIZE_MEMBER(BAD_REQUEST, "인증에 실패했습니다."),
    BLACKLIST_MEMBER(BAD_REQUEST, "블랙리스트 유저입니다."),
    SUSPEND_MEMBER(BAD_REQUEST, "정지된 사용자입니다."),
    FAIL_TO_LOGIN(BAD_REQUEST, "로그인 실패했습니다. 인증 정보를 확인해주세요."),
    CANNOT_RESOLVE_MESSAGE(BAD_REQUEST, "메시지 객체 생성에 실패했습니다."),
    INVALID_VP(BAD_REQUEST, "잘못된 VP 정보입니다."),

    /* 401 UNAUTHORIZED : 인증되지 않은 사용자 */
    INVALID_AUTH_TOKEN(UNAUTHORIZED, "잘못된 토큰입니다."),

        ;

    private final HttpStatus httpStatus;
    private final String detail;
}
