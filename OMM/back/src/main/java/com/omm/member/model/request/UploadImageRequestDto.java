package com.omm.member.model.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;

import java.sql.Blob;
import java.util.List;

@Getter
public class UploadImageRequestDto {

    @JsonProperty(value = "photos")
    private List<Blob> images;
}
