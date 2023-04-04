package com.omm.admin.model.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

import java.io.Serializable;
import java.sql.Blob;

@Getter
@NoArgsConstructor
public class CreateReportRequestDto implements Serializable {

    @JsonProperty(value = "target_id")
    private Long targetId;

    @JsonProperty(value = "reason")
    private String reason;

    @JsonProperty(value = "state")
    private boolean state;

    @JsonProperty(value = "category")
    private String category;

}
