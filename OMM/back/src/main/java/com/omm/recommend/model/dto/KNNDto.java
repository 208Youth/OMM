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
    private double age;

    @JsonProperty("height")
    private double height;

    @JsonProperty("distance")
    private double distance;

    @JsonProperty("contact_style")
    private double contactStyle;

    @JsonProperty("drinking_style")
    private double drinkingStyle;

    @JsonProperty("smoking_style")
    private double smokingStyle;

}
