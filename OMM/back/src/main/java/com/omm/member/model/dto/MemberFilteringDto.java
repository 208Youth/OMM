package com.omm.member.model.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;

@Getter
public class MemberFilteringDto {

    @JsonProperty(value = "age_min")
    private int ageMin;

    @JsonProperty(value = "age_max")
    private int ageMax;

    @JsonProperty(value = "height_min")
    private int heightMin;

    @JsonProperty(value = "height_max")
    private int heightMax;

    @JsonProperty(value = "range_min")
    private int rangeMin = 0;

    @JsonProperty(value = "range_max")
    private int rangeMax;

    @JsonProperty(value = "contact_style")
    private String contactStyle;

    @JsonProperty(value = "drinking_style")
    private String drinkingStyle;

    @JsonProperty(value = "smoking_style")
    private String smokingStyle;
}
