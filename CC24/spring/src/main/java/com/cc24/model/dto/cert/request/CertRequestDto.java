package com.cc24.model.dto.cert.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;

import java.util.Map;

@Getter
public class CertRequestDto {
    @JsonProperty(value = "credentialName")
    private String credentialName;

    @JsonProperty(value = "personalId")
    private Map<String, Object> personalId;

    @JsonProperty(value = "id")
    private Long id;


}
