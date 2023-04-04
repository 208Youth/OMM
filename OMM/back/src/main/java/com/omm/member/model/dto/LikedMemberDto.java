package com.omm.member.model.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

import java.sql.Blob;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class LikedMemberDto {

    @JsonProperty(value = "member_id")
    private Long memberId;

    @JsonProperty(value = "nickname")
    private String nickname;

    @JsonProperty(value = "age")
    private short age;

    @JsonProperty(value = "image_main")
    private byte[] imageMain;

//    public LikedMemberDto(Long memberId, String nickname, short age){
//        this.memberId = memberId;
//        this.nickname = nickname;
//        this.age = age;
//        this.imageMain = imageMain;
//    }
}
