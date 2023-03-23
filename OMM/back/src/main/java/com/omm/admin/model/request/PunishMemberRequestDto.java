package com.omm.admin.model.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

@Getter
@NoArgsConstructor
@RequiredArgsConstructor
@AllArgsConstructor
@Builder
public class PunishMemberRequestDto {

    @JsonProperty(value = "penaltyid")
    Long memberId;

    @JsonProperty(value = "type", required = true)
    String type;

    @JsonProperty(value = "value")
    int period;
}
