package com.omm.member.model.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;

@Getter
public class PutMemberInfoRequestDto {

    @JsonProperty(value = "height")
    private short height;

    @JsonProperty(value = "contact_style")
    private String contactStyle;

    @JsonProperty(value = "drinking_style")
    private String drinkingStyle;

    @JsonProperty(value = "smoking_style")
    private String smokingStyle;

    @JsonProperty(value = "military")
    private String military;

    @JsonProperty(value = "pet")
    private String pet;

    @JsonProperty(value = "MBTI")
    private String mbti;
}
