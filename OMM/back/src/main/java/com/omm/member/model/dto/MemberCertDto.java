package com.omm.member.model.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MemberCertDto {

    @JsonProperty(value = "university")
    private boolean university;

    @JsonProperty(value = "job")
    private boolean job;

    @JsonProperty(value = "certificate")
    private boolean certificate;

    @JsonProperty(value = "health")
    private boolean health;

    @JsonProperty(value = "estate")
    private boolean estate;

    @JsonProperty(value = "income")
    private boolean income;
}
