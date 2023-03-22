package com.omm.admin.model.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.omm.admin.model.dto.ReportDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class GetReportsResponseDto {

    @JsonProperty(value = "list")
    List<ReportDto> reports;
}
