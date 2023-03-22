package com.cc24.controller;

import com.cc24.model.dto.estate.response.GetEstateResponseDto;
import com.cc24.model.dto.health.response.GetHealthResponseDto;
import com.cc24.model.dto.income.response.GetIncomeResponseDto;
import com.cc24.model.dto.job.response.GetJobsResponseDto;
import com.cc24.model.dto.AuthInfoDto;
import com.cc24.model.dto.university.response.GetUniversitiesResponseDto;
import com.cc24.service.CertService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
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

    @GetMapping("/university/{university-id}")
    public ResponseEntity<?> getUniversityCert(@RequestBody AuthInfoDto authInfoDto,
                                               @PathVariable("university-id") Long universityId) {
        certService.getUniversityCert(authInfoDto, universityId);
        return new ResponseEntity<>(HttpStatus.OK);
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
}
