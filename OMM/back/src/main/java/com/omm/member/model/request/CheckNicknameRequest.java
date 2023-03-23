package com.omm.member.model.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;

@Getter
public class CheckNicknameRequest {

    @JsonProperty(value = "nickname")
    private String nickname;
}
