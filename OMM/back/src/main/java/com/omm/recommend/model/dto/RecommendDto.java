package com.omm.recommend.model.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.omm.model.entity.Member;
import com.omm.model.entity.enums.InfoContactStyle;
import com.omm.model.entity.enums.InfoDrinkingStyle;
import com.omm.model.entity.enums.InfoSmokingStyle;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RecommendDto {

    @JsonProperty("id")
    private Long id;

    @JsonProperty("member_id")
    private Member member;

    @JsonProperty("age")
    private short age;

    @JsonProperty("height")
    private short height;

    @JsonProperty("distance")
    private float distance;

    @JsonProperty("contact_style")
    private InfoContactStyle contactStyle;

    @JsonProperty("drinking_style")
    private InfoDrinkingStyle drinkingStyle;

    @JsonProperty("smoking_style")
    private InfoSmokingStyle smokingStyle;

    @JsonProperty("liked")
    private boolean liked;
}
