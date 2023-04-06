package com.omm.member.model.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;

@Getter
public class PostInterestRequestDto {

    @JsonProperty(value = "name")
    private String name;
}
