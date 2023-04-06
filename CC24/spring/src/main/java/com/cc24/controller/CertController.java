package com.cc24.controller;

import com.cc24.model.dto.cert.request.CertRequestDto;
import com.cc24.model.dto.certificate.response.GetCertificatesResponseDto;
import com.cc24.model.dto.job.response.GetJobsResponseDto;
import com.cc24.model.dto.cert.response.CertResponseDto;
import com.cc24.model.dto.university.response.GetUniversitiesResponseDto;
import com.cc24.service.CertService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/cert")
@RequiredArgsConstructor
public class CertController {
    private final CertService certService;

    @GetMapping("/university")
    public ResponseEntity<?> getUniversityList() {
        return new ResponseEntity<>(new GetUniversitiesResponseDto(certService.getUniversityList()), HttpStatus.OK);
    }

    @GetMapping("/job")
    public ResponseEntity<?> getJobList() {
        return new ResponseEntity<>(new GetJobsResponseDto(certService.getJobList()), HttpStatus.OK);
    }

    @GetMapping("/certificate")
    public ResponseEntity<?> getCertificateList() {
        return new ResponseEntity<>(new GetCertificatesResponseDto(certService.getCertificateList()), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<?> getCert(@RequestBody CertRequestDto certRequestDto) {
        Map<String, Object> result = certService.getCert(certRequestDto);
        CertResponseDto certResponseDto = new CertResponseDto();
        certResponseDto.setValue((String) result.get("key"), (Map<String, Object>) result.get("claims"));
        return new ResponseEntity<>(certResponseDto, HttpStatus.OK);
    }
}
