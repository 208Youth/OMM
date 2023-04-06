package com.omm.member.model.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;

@Getter
public class PutMemberPrRequestDto {

    @JsonProperty(value = "pr")
    private String pr;
}
