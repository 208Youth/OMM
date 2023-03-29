package com.omm.admin.model.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Builder;
import lombok.Getter;

import java.sql.Blob;

@Getter
@Builder
public class CreateReportRequestDto {

    @JsonProperty(value = "target_id")
    private Long targetId;

    @JsonProperty(value = "reason")
    private String reason;

    @JsonProperty(value = "image")
    private Blob image;

    @JsonProperty(value = "state")
    private boolean state;

    @JsonProperty(value = "category")
    private String category;
}
