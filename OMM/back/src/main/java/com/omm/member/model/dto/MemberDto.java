package com.omm.member.model.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

import java.time.LocalDate;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MemberDto {

    @JsonProperty(value = "member_id", required = true)
    private Long id;

    @JsonProperty(value = "is_black")
    private boolean isBlack = false;

    @JsonProperty(value = "grade", required = true)
    private String grade;

    @JsonProperty(value = "nickname", required = true)
    private String nickname;

    @JsonProperty(value = "suspend_date")
    private LocalDate suspendDate;
}
