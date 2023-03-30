package com.omm.member.model.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.sql.Blob;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class LikedMemberDto {

    @JsonProperty(value = "member_id")
    private Long memberId;

    @JsonProperty(value = "image_main")
    private Blob imageMain;

    @JsonProperty(value = "nickname")
    private String nickname;

    @JsonProperty(value = "age")
    private short age;
}
