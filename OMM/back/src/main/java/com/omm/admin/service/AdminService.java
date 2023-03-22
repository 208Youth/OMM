package com.omm.admin.service;

import com.omm.admin.model.dto.ReportDto;
import com.omm.admin.model.request.CreateReportRequestDto;
import com.omm.admin.repository.ReportRepository;
import com.omm.exception.admin.ReportExceptionCode;
import com.omm.exception.admin.ReportRuntimeException;
import com.omm.exception.member.MemberExceptionCode;
import com.omm.exception.member.MemberRuntimeException;
import com.omm.member.repository.MemberRepository;
import com.omm.model.entity.Member;
import com.omm.model.entity.Report;
import com.omm.model.entity.enums.ReportCategory;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AdminService {

    private final ReportRepository reportRepository;

    private final MemberRepository memberRepository;


    public boolean createReport(CreateReportRequestDto createReportRequestDto, String memberNickname, String targetNickname){

        // 현재 등록중인 멤버를 찾는다.
        Member member = memberRepository.findByNickname(memberNickname)
            .orElseThrow(() -> new MemberRuntimeException(MemberExceptionCode.MEMBER_NOT_EXISTS));

        // 신고당한 멤버를 찾는다.
        Member target = memberRepository.findByNickname(targetNickname)
            .orElseThrow(() -> new MemberRuntimeException(MemberExceptionCode.MEMBER_NOT_EXISTS));

        // report 를 생성한다.
        try{
            Report report = Report.builder()
                    .member(member)
                    .reported(target)
                    .reason(createReportRequestDto.getReason())
                    .image(createReportRequestDto.getImage())
                    .state(createReportRequestDto.isState())
                    .category(ReportCategory.valueOf(createReportRequestDto.getCategory())).build();
            reportRepository.save(report);
            return true;
        }catch(Exception e) {
            return false;
        }
    }

    public List<ReportDto> getReportList() {
        // 모든 리포트를 가져온다
        List<Report> reports = reportRepository.findAll();
        // 반환할 형식 리스트를 생성한다
        List<ReportDto> result = new ArrayList<>();
        // 반환할 리스트로 하나씩 넣는다
        reports.forEach(report -> {
            result.add(ReportDto.builder()
                    .reportId(report.getId())
                    .memberId(report.getMember().getId())
                    .targetId(report.getReported().getId())
                    .reason(report.getReason())
                    .image(report.getImage())
                    .state(report.isState())
                    .category(report.getCategory().name()).build()
            );
        });
        return result;
    }

    public ReportDto getReport(Long reportId) {
        // 해당 리포트를 찾는다
        Report report = reportRepository.findById(reportId)
                .orElseThrow(() -> new ReportRuntimeException(ReportExceptionCode.REPORT_NOT_FOUND));
        // 반환 형식에 맞게 변경하여 전송한다.
        ReportDto result = ReportDto.builder()
            .reportId(report.getId())
            .memberId(report.getMember().getId())
            .targetId(report.getReported().getId())
            .reason(report.getReason())
            .image(report.getImage())
            .state(report.isState())
            .category(report.getCategory().name()).build();
        return result;
    }

    public void processReport(Long reportId) {
        // 처리할 신고내역을 찾는다.
        Report report = reportRepository.findById(reportId)
                .orElseThrow(() -> new ReportRuntimeException(ReportExceptionCode.REPORT_NOT_FOUND));
        // 세팅하고 저장한다.
        report.setState(true);
        reportRepository.save(report);
    }
}
