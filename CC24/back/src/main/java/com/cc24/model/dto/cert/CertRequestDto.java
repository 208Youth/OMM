package com.cc24.model.dto.cert;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;

@Getter
public class CertRequestDto {
    @JsonProperty(value = "walletJson")
    private String walletJson;

    @JsonProperty(value = "vp")
    private String vp;
}
