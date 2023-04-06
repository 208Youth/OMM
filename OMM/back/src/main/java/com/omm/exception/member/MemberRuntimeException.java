package com.omm.exception.member;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class MemberRuntimeException extends RuntimeException {

    private final MemberExceptionCode memberExceptionCode;

}
