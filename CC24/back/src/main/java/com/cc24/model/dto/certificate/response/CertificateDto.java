package com.cc24.model.dto.certificate.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class CertificateDto {
    @JsonProperty(value = "id")
    Long certificateId;

    @JsonProperty(value = "name")
    String name;
}
