package com.omm.member.model.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RegistDto {

    private String holderDid;
    private short age;
    private String gender;
    private String imageUrl;

}
