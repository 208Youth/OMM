package com.omm.recommend.model.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class KNNDto {

    @JsonProperty("age")
    private float age;

    @JsonProperty("height")
    private float height;

    @JsonProperty("distance")
    private float distance;

    @JsonProperty("contact_style")
    private float contactStyle;

    @JsonProperty("drinking_style")
    private float drinkingStyle;

    @JsonProperty("smoking_style")
    private float smokingStyle;

}
