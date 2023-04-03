package com.omm.member.model.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

import java.sql.Blob;
import java.util.List;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class GetMemberInfoResponseDto {
    @JsonProperty(value = "nickname")
    private String nickname;

    @JsonProperty(value = "age")
    private int age;

    @JsonProperty(value = "lat")
    private float lat;

    @JsonProperty(value = "lng")
    private float lng;

    @JsonProperty(value = "pr")
    private String pr;

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

    @JsonProperty(value = "profileimgs")
    private List<byte[]> profileimgs;
}
