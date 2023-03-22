package com.omm.admin.service;

import com.omm.admin.model.request.CreateReportRequest;
import com.omm.admin.repository.ReportRepository;
import com.omm.member.repository.MemberRepository;
import com.omm.model.entity.Member;
import com.omm.model.entity.Report;
import com.omm.model.entity.enums.ReportCategory;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AdminService {

    private final ReportRepository reportRepository;

    private final MemberRepository memberRepository;


    public boolean createReport(CreateReportRequest createReportRequest, String memberNickname, String targetNickname){

        // 현재 등록중인 멤버를 찾는다.
        Member member = memberRepository.findByNickname(memberNickname)
            // exception 추가해야 함 !!!!!!!
            .orElseThrow();

        // 신고당한 멤버를 찾는다.
        Member target = memberRepository.findByNickname(targetNickname)
            // exception 추가해야 함 !!!!
            .orElseThrow();

        // report 를 생성한다.
        try{
//            ReportCategory reportCategory = null;
//            String cate = createReportRequest.getCategory();
//            switch (cate){
//            }

            Report report = Report.builder()
                    .member(member)
                    .reported(target)
                    .reason(createReportRequest.getReason())
                    .image(createReportRequest.getImage())
                    .state(false)
                    .category(createReportRequest.getCategory()).build();
            reportRepository.save(report);
            return true;
        }catch(Exception e) {
            return false;
        }
    }
}
