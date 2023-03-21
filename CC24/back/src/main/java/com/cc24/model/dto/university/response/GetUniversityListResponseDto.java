package com.cc24.model.dto.university.response;

import lombok.*;

import java.util.List;

@Getter
@AllArgsConstructor
public class GetUniversityListResponseDto {
    List<UniversityDto> universityDto;
}
