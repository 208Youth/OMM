package com.omm.admin.controller;

import com.google.gson.Gson;
import com.omm.admin.model.dto.ReportDto;
import com.omm.admin.model.request.CreateReportRequestDto;
import com.omm.admin.model.request.PunishMemberRequestDto;
import com.omm.admin.model.response.GetReportsResponseDto;
import com.omm.admin.service.AdminService;
import com.omm.exception.admin.ReportExceptionCode;
import com.omm.exception.admin.ReportRuntimeException;
import com.omm.util.SecurityUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/admin")
@RequiredArgsConstructor
public class AdminController {

    private final AdminService adminService;

    /**
     * 채팅방에서 새로운 신고 내역을 생성하는 함수
     * 회원 로직 생성 후 추가 수정 필요
     *
     * @return
     */
    @PostMapping("/report")
    public ResponseEntity<?> createReport(@RequestPart("image") MultipartFile image, @RequestParam("report") String reportJson) {
        Gson gson = new Gson();
        CreateReportRequestDto createReportRequestDto = gson.fromJson(reportJson, CreateReportRequestDto.class);
        // JWT 생성하고 현재 로그인 유저, 타겟 로그인유저 정보 알아와야 함
        // 결과에 따라
        if (adminService.createReport(createReportRequestDto, SecurityUtil.getCurrentDidAddress().get(), image)) {
            return new ResponseEntity<>(HttpStatus.OK);
        } else {
            throw new ReportRuntimeException(ReportExceptionCode.REPORT_POST_SAVE_EXCEPTION);
        }
    }

    /**
     * 신고 내역을 불러오는 함수
     *
     * @return
     */
    @GetMapping("/report")
    public ResponseEntity<?> getReportList() {
        return new ResponseEntity<>(new GetReportsResponseDto(adminService.getReportList()), HttpStatus.OK);
    }

    /**
     * 특정 신고 내역을 불러오는 함수
     *
     * @param reportId 신고내역 아이디
     * @return
     */
    @GetMapping("/report/{report-id}")
    public ResponseEntity<?> getReport(@PathVariable("report-id") Long reportId) {
        return new ResponseEntity<>(adminService.getReport(reportId), HttpStatus.OK);
    }

    /**
     * 신고 내역을 "처리 완료" 상태로 변경
     *
     * @param reportId 신고내역 아이디
     * @return
     */
    @PutMapping("/report/{report-id}")
    public ResponseEntity<?> processReport(@PathVariable("report-id") Long reportId) {
        adminService.processReport(reportId);
        return new ResponseEntity<>("신고 처리 완료",HttpStatus.OK);
    }

    /**
     * 특정 유저를 정지 혹은 탈퇴처리
     * @param punishMemberRequestDto 요청 객체
     * @return
     */
    @PostMapping("/penalty")
    public ResponseEntity<?> punishMember(@RequestBody PunishMemberRequestDto punishMemberRequestDto) {
        adminService.punishMember(punishMemberRequestDto);
        return new ResponseEntity<>("유저 처리 조치 완료",HttpStatus.OK);
    }
}
