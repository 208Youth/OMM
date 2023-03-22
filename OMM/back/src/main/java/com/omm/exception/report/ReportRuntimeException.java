package com.omm.exception.report;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class ReportRuntimeException extends  RuntimeException{

    private final ReportExceptionCode reportExceptionCode;

}
