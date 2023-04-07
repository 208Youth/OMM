package com.omm.member.model.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;

import java.util.List;

@Getter
public class PutMyInterestListRequestDto {

    @JsonProperty(value = "interestList")
    List<String> interestList;
}
