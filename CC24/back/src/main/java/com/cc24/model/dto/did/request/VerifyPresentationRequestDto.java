package com.cc24.model.dto.did.request;

import lombok.Getter;

@Getter
public class VerifyPresentationRequestDto {

    private String walletJson;
    private String serializedVP;
}
