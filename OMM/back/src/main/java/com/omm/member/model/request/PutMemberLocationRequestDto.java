package com.omm.member.model.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;

@Getter
public class PutMemberLocationRequestDto {

    @JsonProperty(value = "lat")
    private float lat;

    @JsonProperty(value = "lng")
    private float lng;
}
