package com.cc24.model.dto.university.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class UniversityDto {
    @JsonProperty(value = "university_id")
    private Long universityId;
    @JsonProperty(value = "name")
    private String name;
}
