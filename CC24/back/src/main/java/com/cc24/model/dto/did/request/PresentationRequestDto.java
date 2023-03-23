package com.cc24.model.dto.did.request;

import java.util.List;
import lombok.Getter;
import lombok.ToString;

@Getter
public class PresentationRequestDto {

    private String walletJson;
    private String presentationName;
    private List<String> holderVcList;
    private List<List<String>> typesOfRequireVcs;

}
