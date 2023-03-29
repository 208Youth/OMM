package com.omm.handler;

import com.omm.exception.CustomException;
import com.omm.exception.admin.ReportExceptionResponse;
import com.omm.exception.admin.ReportRuntimeException;
import com.omm.exception.member.MemberExceptionResponse;
import com.omm.exception.member.MemberRuntimeException;
import com.omm.util.error.ErrorResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

@Slf4j
@RestControllerAdvice
public class GlobalExceptionHandler extends ResponseEntityExceptionHandler {
    @ExceptionHandler(value = {CustomException.class})
    protected ResponseEntity<ErrorResponse> handleCustomException(CustomException e) {
        log.error("handleCustomException throw CustomException : {}", e.getErrorCode());
        return ErrorResponse.toResponseEntity(e.getErrorCode());
    }

    @ExceptionHandler(value = {ReportRuntimeException.class})
    protected ResponseEntity<ReportExceptionResponse> handleCustomException(ReportRuntimeException e) {
        log.error("handleCustomException throw ReportException : {}", e.getReportExceptionCode());
        return ReportExceptionResponse.toResponseEntity(e.getReportExceptionCode());
    }

    @ExceptionHandler(value = {MemberRuntimeException.class})
    protected ResponseEntity<MemberExceptionResponse> handleCustomException(MemberRuntimeException e) {
        log.error("handleCustomException throw MemberException : {}", e.getMemberExceptionCode());
        return MemberExceptionResponse.toResponseEntity(e.getMemberExceptionCode());
    }
}
