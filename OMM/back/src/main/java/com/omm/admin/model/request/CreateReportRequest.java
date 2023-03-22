package com.omm.admin.model.request;

import com.omm.model.entity.enums.ReportCategory;
import lombok.Builder;
import lombok.Getter;

import java.sql.Blob;

@Getter
@Builder
public class CreateReportRequest {

    private String reason;

    private Blob image;

    private boolean state;

    // 이거 안받아지면 고쳐야 함
    private ReportCategory category;
}
