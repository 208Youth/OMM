package com.omm.admin.model.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.omm.model.entity.enums.ReportCategory;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.sql.Blob;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ReportDto {

    @JsonProperty(value = "report_id")
    private Long reportId;

    @JsonProperty(value = "member_id")
    private Long memberId;

    @JsonProperty(value = "reported_id")
    private Long targetId;

    @JsonProperty(value = "reason")
    private String reason;

    @JsonProperty(value = "image")
    private byte[] image;

    @JsonProperty(value = "state")
    private boolean state;

    @JsonProperty(value = "category")
    private String category;


}
