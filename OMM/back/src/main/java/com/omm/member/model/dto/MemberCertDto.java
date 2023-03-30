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

    @JsonProperty(value = "university_name")
    private String universityName;

    @JsonProperty(value = "job")
    private boolean job;

    @JsonProperty(value = "job_name")
    private String jobNames;

    @JsonProperty(value = "certificate")
    private boolean certificate;

    @JsonProperty(value = "certificate_names")
    private String certificateNames;

    @JsonProperty(value = "health")
    private boolean health;

    @JsonProperty(value = "health_info")
    private String healthInfo;

    @JsonProperty(value = "estate")
    private boolean estate;

    @JsonProperty(value = "estate_amount")
    private Long estateAmount;

    @JsonProperty(value = "income")
    private boolean income;

    @JsonProperty(value = "income_amount")
    private Long incomeAmount;
}
