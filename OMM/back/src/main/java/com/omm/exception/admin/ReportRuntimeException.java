package com.omm.exception.admin;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class ReportRuntimeException extends RuntimeException {

    private final ReportExceptionCode reportExceptionCode;

}
