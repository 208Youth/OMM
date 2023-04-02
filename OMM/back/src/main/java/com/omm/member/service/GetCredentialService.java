package com.omm.member.service;

import com.google.gson.Gson;
import com.omm.exception.CustomException;
import com.omm.exception.member.MemberExceptionCode;
import com.omm.exception.member.MemberRuntimeException;
import com.omm.member.model.dto.AuthDto;
import com.omm.member.model.dto.SubjectsDto;
import com.omm.model.entity.Member;
import com.omm.model.entity.MemberCert;
import com.omm.repository.MemberCertRepository;
import com.omm.repository.MemberImgRepository;
import com.omm.repository.MemberRepository;
import com.omm.util.UrlInfo;
import com.omm.util.error.ErrorCode;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class GetCredentialService {

    private static final Logger logger = LoggerFactory.getLogger(AuthService.class);
    private final RestTemplate restTemplate;
    private final MemberCertRepository memberCertRepository;
    private final MemberRepository memberRepository;
    private final UrlInfo urlInfo;

    public void getCertificate(String type, AuthDto authDto) {
        Member member = memberRepository.findByDidAddress(authDto.getHolderDid())
                .orElseThrow(() -> new MemberRuntimeException(MemberExceptionCode.MEMBER_NOT_EXISTS));
        MemberCert memberCert = memberCertRepository.findByMember(member)
                .orElseThrow(() -> new MemberRuntimeException(MemberExceptionCode.MEMBER_INFO_NOT_EXISTS));

        switch (type) {
            case "UniversityCredential":
                String university = getUniversityCredential(authDto);
                memberCert.setUniversity(true);
                memberCert.setUniversityName(university);
                break;
            case "CertificateCredential":
                String certificate = getCertificateCredential(authDto);
                memberCert.setCertificate(true);
                memberCert.setCertificateNames(certificate);
                break;
            case "JobCredential":
                String job = getJobCredential(authDto);
                memberCert.setJob(true);
                memberCert.setJobNames(job);
                break;
            case "IncomeCredential":
                String income = getIncomeCredential(authDto);
                memberCert.setIncome(true);
                memberCert.setIncomeAmount(income);
                break;
            case "EstateCredential":
                String estate = getEstateCredential(authDto);
                memberCert.setEstate(true);
                System.out.println(estate);
                memberCert.setEstateAmount(estate);
                break;
            case "HealthCredential":
                String health = getHealthCredential(authDto);
                memberCert.setHealth(true);
                memberCert.setHealthInfo(health);
                break;
            default:
                throw new CustomException(ErrorCode.CANNOT_AUTHORIZE_MEMBER);
        }
        memberCertRepository.save(memberCert);
    }

    public String getUniversityCredential(AuthDto authDto) {
        SubjectsDto subjects = verifyVP(authDto);
        Map<String, String> universityInfo = subjects.getSubjects().get("university");
        if (universityInfo == null || universityInfo.get("name") == null) {
            throw new CustomException(ErrorCode.INVALID_VP);
        }
        return universityInfo.get("name");
    }

    public String getCertificateCredential(AuthDto authDto) {
        SubjectsDto subjects = verifyVP(authDto);
        Map<String, String> cerificateInfo = subjects.getSubjects().get("certificate");
        if (cerificateInfo == null || cerificateInfo.get("name") == null) {
            throw new CustomException(ErrorCode.INVALID_VP);
        }
        return cerificateInfo.get("name");
    }

    public String getJobCredential(AuthDto authDto) {
        SubjectsDto subjects = verifyVP(authDto);
        Map<String, String> jobInfo = subjects.getSubjects().get("university");
        if (jobInfo == null || jobInfo.get("name") == null) {
            throw new CustomException(ErrorCode.INVALID_VP);
        }
        return jobInfo.get("name");
    }

    public String getIncomeCredential(AuthDto authDto) {
        SubjectsDto subjects = verifyVP(authDto);
        Map<String, String> incomeInfo = subjects.getSubjects().get("income");
        if (incomeInfo == null || incomeInfo.get("income") == null) {
            throw new CustomException(ErrorCode.INVALID_VP);
        }
        return incomeInfo.get("name");
    }

    public String getEstateCredential(AuthDto authDto) {
        SubjectsDto subjects = verifyVP(authDto);
        Map<String, String> estateInfo = subjects.getSubjects().get("estate");
        if (estateInfo == null || estateInfo.get("estates") == null) {
            throw new CustomException(ErrorCode.INVALID_VP);
        }
        return estateInfo.get("estates");
    }

    public String getHealthCredential(AuthDto authDto) {
        SubjectsDto subjects = verifyVP(authDto);
        Map<String, String> healthInfo = subjects.getSubjects().get("health");
        if (healthInfo == null || healthInfo.get("date") == null) {
            throw new CustomException(ErrorCode.INVALID_VP);
        }
        return healthInfo.get("date");
    }

    private SubjectsDto verifyVP(AuthDto authDto) {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        Gson gsonObj = new Gson();

        Map<String, String> requestBody = new HashMap<>();
        requestBody.put("holderDid", authDto.getHolderDid());
        requestBody.put("vpJwt", authDto.getVpJwt());

        HttpEntity<String> requestEntity = new HttpEntity<>(gsonObj.toJson(requestBody), headers);

        String url = urlInfo.getNodeapi() + "/api/node/presentation";
        HttpMethod httpMethod = HttpMethod.POST;

        try {
            ResponseEntity<String> responseEntity = restTemplate.exchange(url, httpMethod,
                    requestEntity, String.class);
            return gsonObj.fromJson(responseEntity.getBody(), SubjectsDto.class);
        } catch (HttpClientErrorException e) {
            logger.debug(e.getMessage());
            logger.debug(e.getResponseBodyAsString());
            throw new CustomException(ErrorCode.INVALID_VP);
        }

    }
}
