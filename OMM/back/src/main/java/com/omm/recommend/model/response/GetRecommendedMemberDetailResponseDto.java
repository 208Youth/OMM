package com.omm.recommend.model.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.sql.Blob;
import java.util.List;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class GetRecommendedMemberDetailResponseDto {

    @JsonProperty(value = "memberId")
    private Long memberId;

    @JsonProperty(value = "nickname")
    private String nickname;

    @JsonProperty(value = "pr")
    private String pr;

    @JsonProperty(value = "age")
    private short age;

    @JsonProperty(value = "imageList")
    List<byte[]> imageList;

    @JsonProperty(value = "interestList")
    List<String> interestList;
}
