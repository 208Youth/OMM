package com.omm.exception.member;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
@AllArgsConstructor
public enum MemberExceptionCode {

    MEMBER_NOT_EXISTS(HttpStatus.NOT_FOUND, "존재하지 않는 회원입니다.");;

    private final HttpStatus httpStatus;
    private final String detail;
}
