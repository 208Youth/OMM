package com.cc24.model.dto.certificate.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

import java.util.List;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class GetCertificatesResponseDto {
    @JsonProperty(value = "list")
    List<CertificateDto> certificates;
}
