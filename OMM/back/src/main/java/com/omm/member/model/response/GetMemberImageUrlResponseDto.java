package com.omm.member.model.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class GetMemberImageUrlResponseDto {

    private String didAddress;
    private String faceUrl;

}
