package com.cc24.model.dto.university.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

import java.util.List;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class GetUniversitiesResponseDto {
    @JsonProperty(value = "list")
    List<UniversityDto> universities;
}
