package com.cc24.model.dto.income.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class GetIncomeResponseDto {
    @JsonProperty(value = "income")
    Long income;
}
