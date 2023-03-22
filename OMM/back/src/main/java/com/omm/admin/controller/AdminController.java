package com.omm.admin.controller;

import com.omm.admin.model.request.CreateReportRequestDto;
import com.omm.admin.model.response.GetReportsResponseDto;
import com.omm.admin.service.AdminService;
import com.omm.exception.admin.ReportExceptionCode;
import com.omm.exception.admin.ReportRuntimeException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/admin")
@RequiredArgsConstructor
public class AdminController {

    private final AdminService adminService;

    @PostMapping("/report")
    public ResponseEntity<?> createReport(@RequestBody CreateReportRequestDto createReportRequestDto){
        // JWT 생성하고 현재 로그인 유저, 타겟 로그인유저 정보 알아와야 함
        String memberNickname = "김미미";
        String targetNickname = "곽두팔";

        // 결과에 따라
        if(adminService.createReport(createReportRequestDto,memberNickname,targetNickname)){
            return new ResponseEntity<>(HttpStatus.OK);
        }else{
            throw new ReportRuntimeException(ReportExceptionCode.REPORT_POST_SAVE_EXCEPTION);
        }
    }

    @GetMapping("/report")
    public ResponseEntity<?> getReportList(){
        return new ResponseEntity<>(new GetReportsResponseDto(adminService.getReportList()),HttpStatus.OK);
    }
}
