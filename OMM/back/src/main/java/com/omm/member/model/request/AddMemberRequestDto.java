package com.omm.member.model.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;

@Getter
public class AddMemberRequestDto {

    @JsonProperty("did_address")
    private String didAddress;

    @JsonProperty("age")
    private short age;

    @JsonProperty("gender")
    private String gender;
}
