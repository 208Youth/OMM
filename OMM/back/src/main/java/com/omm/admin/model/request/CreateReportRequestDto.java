package com.omm.admin.model.request;

import lombok.Builder;
import lombok.Getter;

import java.sql.Blob;

@Getter
@Builder
public class CreateReportRequestDto {

    private String reason;

    private Blob image;

    private boolean state;

    private String category;
}
