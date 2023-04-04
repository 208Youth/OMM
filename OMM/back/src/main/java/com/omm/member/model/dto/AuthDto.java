package com.omm.member.model.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AuthDto {

    @JsonProperty(value = "holderDid")
    private String holderDid;

    @JsonProperty(value = "vpJwt")
    private String vpJwt;

}
