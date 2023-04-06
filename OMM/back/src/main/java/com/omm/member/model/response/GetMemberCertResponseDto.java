package com.omm.member.model.response;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class GetMemberCertResponseDto {
    private String university;
    private String job;
    private String certificate;
    private String health;
    private Long estate;
    private Long income;
}
