package com.omm.member.model.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.omm.member.model.dto.LikedMemberDto;
import lombok.Getter;

import java.util.List;

@Getter
public class GetLikedMembersResponseDto {

    @JsonProperty(value = "liked_list")
    private List<LikedMemberDto> likedList;
}
