package com.cc24.model.dto.cert.response;

import com.fasterxml.jackson.annotation.JsonAnySetter;
import lombok.Getter;

import java.util.HashMap;
import java.util.Map;

@Getter
public class CertResponseDto {
    private Map<String, Object> data = new HashMap<>();
    @JsonAnySetter
    public void setValue(String key, Map<String, Object> value) {
        this.data.put(key, value);
    }
}
