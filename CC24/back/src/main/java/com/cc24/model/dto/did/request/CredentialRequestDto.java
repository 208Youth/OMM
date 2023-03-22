package com.cc24.model.dto.did.request;

import java.util.Map;
import lombok.Getter;

@Getter
public class CredentialRequestDto {

    private String walletJson;
    private String credentialName;
    private Map<String, Object> claims;

}
