package com.omm.member.model.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.omm.member.model.dto.InterestDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class GetInterestListResponseDto {

    @JsonProperty(value = "interestList")
    private List<InterestDto> interestList;
}
