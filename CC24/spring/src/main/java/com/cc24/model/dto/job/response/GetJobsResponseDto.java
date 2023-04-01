package com.cc24.model.dto.job.response;

import com.cc24.model.dto.university.response.UniversityDto;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

import java.util.List;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class GetJobsResponseDto {
    @JsonProperty(value = "list")
    List<JobDto> jobs;
}
