package com.omm.admin.model.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.omm.model.entity.enums.ReportCategory;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.Map;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ReportDto {

    @JsonProperty(value = "reportId")
    private Long reportId;

    @JsonProperty(value = "memberInfo")
    private Map<String, Object> memberInfo;

    @JsonProperty(value = "reportedMemberInfo")
    private Map<String, Object> reportedMemberInfo;

    @JsonProperty(value = "reason")
    private String reason;

    @JsonProperty(value = "image")
    private byte[] image;

    @JsonProperty(value = "state")
    private boolean state;

    @JsonProperty(value = "category")
    private String category;


}
