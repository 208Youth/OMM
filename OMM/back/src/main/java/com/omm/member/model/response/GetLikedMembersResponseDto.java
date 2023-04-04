package com.omm.member.model.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.omm.member.model.dto.LikedMemberDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class GetLikedMembersResponseDto {

    @JsonProperty(value = "liked_list")
    private List<LikedMemberDto> likedList;
}
