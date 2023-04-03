package com.omm.admin.model.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class GetReportResponseDto {
    @JsonProperty(value = "reportId")
    private Long reportId;

    @JsonProperty(value = "memberNickname")
    private String memberNickname;

    @JsonProperty(value = "reportedMemberNickname")
    private String reportedMemberNickname;

    @JsonProperty(value = "state")
    private boolean state;

    @JsonProperty(value = "category")
    private String category;
}
