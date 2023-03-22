package com.cc24.model.dto.job.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class JobDto {
    @JsonProperty(value = "job_id")
    private Long jobId;
    @JsonProperty(value = "name")
    private String name;
}
