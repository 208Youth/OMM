package com.omm.member.model.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;

@Getter
public class DeleteInterestRequestDto {

    @JsonProperty(value = "interest_list_id")
    private Long interestListId;
}
