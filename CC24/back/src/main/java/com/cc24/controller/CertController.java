package com.cc24.controller;

import com.cc24.exception.CustomException;
import com.cc24.model.dto.cert.CertRequestDto;
import com.cc24.model.dto.certificate.response.GetCertificatesResponseDto;
import com.cc24.model.dto.estate.response.GetEstateResponseDto;
import com.cc24.model.dto.health.response.GetHealthResponseDto;
import com.cc24.model.dto.income.response.GetIncomeResponseDto;
import com.cc24.model.dto.job.response.GetJobsResponseDto;
import com.cc24.model.dto.AuthInfoDto;
import com.cc24.model.dto.university.response.GetUniversitiesResponseDto;
import com.cc24.service.CertService;
import com.cc24.service.DidService;
import com.cc24.util.error.ErrorCode;
import com.metadium.did.MetadiumWallet;
import com.metadium.did.exception.DidException;
import com.metadium.vc.VerifiablePresentation;
import com.nimbusds.jose.JOSEException;
import com.nimbusds.jwt.SignedJWT;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.text.ParseException;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/cert")
@RequiredArgsConstructor
public class CertController {
    private final CertService certService;
    private final DidService didService;

    @GetMapping("/university")
    public ResponseEntity<?> getUniversityList() {
        return new ResponseEntity<>(new GetUniversitiesResponseDto(certService.getUniversityList()), HttpStatus.OK);
    }

    @GetMapping("university/{university-id}")
    public ResponseEntity<?> getUniversityCert(@RequestBody CertRequestDto certRequestDto,
                                               @PathVariable("university-id") Long universityId) {
        try {
            VerifiablePresentation vp = new VerifiablePresentation(
                    SignedJWT.parse(certRequestDto.getVp()));
            List<SignedJWT> credentials = didService.getCredentials(vp);
            MetadiumWallet holderWallet = MetadiumWallet.fromJson(certRequestDto.getWalletJson());
            Map<String, Object> claims = new HashMap<>();
            for (SignedJWT credential : credentials) {
                didService.verify(credential, holderWallet.getDid(), vp.getHolder().toString());
                claims.putAll(didService.getClaims(credential));
            }
            Map<String, Object> universityInfo = certService.getUniversityCert(claims, universityId);
            String did = holderWallet.getDid();

            String vc = didService.issueCredential("UniversityCredential", did, universityInfo);
            return new ResponseEntity<>(vc, HttpStatus.OK);
        } catch (ParseException | JOSEException | DidException | IOException e) {
            throw new CustomException(ErrorCode.DID_ERROR);
        }
    }

    @GetMapping("/job")
    public ResponseEntity<?> getJobList() {
        return new ResponseEntity<>(new GetJobsResponseDto(certService.getJobList()), HttpStatus.OK);
    }

    @GetMapping("/job/{job-id}")
    public ResponseEntity<?> getJobCert(@RequestBody AuthInfoDto authInfoDto,
                                        @PathVariable("job-id") Long jobId) {
        certService.getJobCert(authInfoDto, jobId);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/income")
    public ResponseEntity<?> getIncomeCert(@RequestBody AuthInfoDto authInfoDto) {
        return new ResponseEntity<>(new GetIncomeResponseDto(certService.getIncomeCert(authInfoDto)), HttpStatus.OK);
    }

    @GetMapping("/estate")
    public ResponseEntity<?> getEstateCert(@RequestBody AuthInfoDto authInfoDto) {
        return new ResponseEntity<>(new GetEstateResponseDto(certService.getEstateCert(authInfoDto)), HttpStatus.OK);
    }

    @GetMapping("/health")
    public ResponseEntity<?> getHealthCert(@RequestBody AuthInfoDto authInfoDto) {
        Map<String, Object> result = certService.getHealthCert(authInfoDto);
        return new ResponseEntity<>(new GetHealthResponseDto((String) result.get("value"),
                (Date) result.get("date")), HttpStatus.OK);
    }

    @GetMapping("/certificate")
    public ResponseEntity<?> getCertificateList() {
        return new ResponseEntity<>(new GetCertificatesResponseDto(certService.getCertificateList()), HttpStatus.OK);
    }

    @GetMapping("/certificate/{certificate-id}")
    public ResponseEntity<?> getCertificateCert(@RequestBody AuthInfoDto authInfoDto,
                                        @PathVariable("certificate-id") Long certificateId) {
        certService.getCertificateCert(authInfoDto, certificateId);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
