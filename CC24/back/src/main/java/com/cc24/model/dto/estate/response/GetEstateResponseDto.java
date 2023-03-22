package com.cc24.model.dto.estate.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

import java.util.List;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class GetEstateResponseDto {
    @JsonProperty(value = "estate")
    List<Long> estates;
}
