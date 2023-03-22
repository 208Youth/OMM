package com.omm.exception.member;

import lombok.Builder;
import lombok.Getter;
import org.springframework.http.ResponseEntity;

@Getter
@Builder
public class MemberExceptionResponse {
    private final String message;

    public static ResponseEntity<MemberExceptionResponse> toResponseEntity(MemberExceptionCode memberExceptionCode){
        return ResponseEntity.status(memberExceptionCode.getHttpStatus())
                .body((MemberExceptionResponse.builder().message(memberExceptionCode.getDetail())).build() );
    }
}
