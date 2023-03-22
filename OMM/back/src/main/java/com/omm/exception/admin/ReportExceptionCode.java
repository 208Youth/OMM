package com.omm.exception.admin;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
@AllArgsConstructor
public enum ReportExceptionCode {

    REPORT_POST_SAVE_EXCEPTION(HttpStatus.BAD_REQUEST, "신고 내역 등록에 실패하였습니다."),

    REPORT_NOT_FOUND(HttpStatus.NOT_FOUND, "존재하지 않는 신고 내역입니다."),

    REPORT_BAD_REQUEST(HttpStatus.BAD_REQUEST, "잘못된 처리 요청입니다.")
    ;

    private final HttpStatus httpStatus;
    private final String detail;
}
