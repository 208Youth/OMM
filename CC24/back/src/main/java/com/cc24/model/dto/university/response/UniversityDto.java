package com.cc24.model.dto.university.response;

import lombok.*;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class UniversityDto {
    private Long university_id;
    private String name;
}
