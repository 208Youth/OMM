package com.cc24.model.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import java.util.Date;

@Getter
public class AuthInfoDto {
    @JsonProperty(value = "name")
    String name;
    @JsonProperty(value = "birth_date")
    Date birthDate;
}
