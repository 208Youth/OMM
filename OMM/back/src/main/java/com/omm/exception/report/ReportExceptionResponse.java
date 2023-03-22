package com.omm.exception.report;

import lombok.Builder;
import lombok.Getter;
import org.springframework.http.ResponseEntity;

@Getter
@Builder
public class ReportExceptionResponse {
    private final String message;

    public static ResponseEntity<ReportExceptionResponse> toResponseEntity(ReportExceptionCode reportExceptionCode){
        return ResponseEntity.status(reportExceptionCode.getHttpStatus())
                .body((ReportExceptionResponse.builder().message(reportExceptionCode.getDetail())).build() );
    }
}
