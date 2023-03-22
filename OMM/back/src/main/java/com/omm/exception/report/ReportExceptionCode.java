package com.omm.exception.report;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
@AllArgsConstructor
public enum ReportExceptionCode {

    REPORT_POST_SAVE_EXCEPTION(HttpStatus.BAD_REQUEST, "신고 내역 등록에 실피하였습니다.");

    private final HttpStatus httpStatus;
    private final String detail;
}
