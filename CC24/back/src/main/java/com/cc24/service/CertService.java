package com.cc24.service;

import com.cc24.exception.CustomException;
import com.cc24.model.dto.certificate.response.CertificateDto;
import com.cc24.model.dto.job.response.JobDto;
import com.cc24.model.dto.AuthInfoDto;
import com.cc24.model.dto.university.response.UniversityDto;
import com.cc24.model.entity.certificate.Certificate;
import com.cc24.model.entity.estate.Estate;
import com.cc24.model.entity.health.Health;
import com.cc24.model.entity.job.Employee;
import com.cc24.model.entity.job.Job;
import com.cc24.model.entity.university.Student;
import com.cc24.model.entity.university.University;
import com.cc24.repository.certificate.CertificateRepository;
import com.cc24.repository.estate.EstateRepository;
import com.cc24.repository.health.HealthRepository;
import com.cc24.repository.income.IncomeRepository;
import com.cc24.repository.job.EmployeeRepository;
import com.cc24.repository.job.JobRepository;
import com.cc24.repository.university.StudentRepository;
import com.cc24.repository.university.UniversityRepository;
import com.cc24.util.error.ErrorCode;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CertService {
    private final UniversityRepository universityRepository;
    private final StudentRepository studentRepository;
    private final JobRepository jobRepository;
    private final EmployeeRepository employeeRepository;
    private final IncomeRepository incomeRepository;
    private final EstateRepository estateRepository;
    private final HealthRepository healthRepository;
    private final CertificateRepository certificateRepository;


    public List<UniversityDto> getUniversityList() {
        List<University> universities = universityRepository.findAll();
        List<UniversityDto> result = new ArrayList<>();
        universities.forEach(university -> {
            result.add(UniversityDto.builder()
                            .universityId(university.getId())
                            .name(university.getName())
                            .build());
        });
        return result;
    }

    public void getUniversityCert(AuthInfoDto authInfoDto, Long universityId) {
        String name = authInfoDto.getName();
        Date birthDate = authInfoDto.getBirthDate();

        Student student = studentRepository.findByNameAndBirthDate(name, birthDate)
                .orElseThrow(() -> new CustomException(ErrorCode.MEMBER_NOT_FOUND));

        if(student.getUniversity().getId() != universityId) {
            throw new CustomException(ErrorCode.CANNOT_AUTHORIZE_MEMBER);
        }
    }

    public List<JobDto> getJobList() {
        List<Job> jobs = jobRepository.findAll();
        List<JobDto> result = new ArrayList<>();
        jobs.forEach(job -> {
            result.add(JobDto.builder()
                    .jobId(job.getId())
                    .name(job.getName())
                    .build());
        });
        return result;
    }

    public void getJobCert(AuthInfoDto authInfoDto, Long jobId) {
        String name = authInfoDto.getName();
        Date birthDate = authInfoDto.getBirthDate();

        Employee employee = employeeRepository.findByNameAndBirthDate(name, birthDate)
                .orElseThrow(() -> new CustomException(ErrorCode.MEMBER_NOT_FOUND));

        if(employee.getJob().getId() != jobId) {
            throw new CustomException(ErrorCode.CANNOT_AUTHORIZE_MEMBER);
        }
    }

    public Long getIncomeCert(AuthInfoDto authInfoDto) {
        String name = authInfoDto.getName();
        Date birthDate = authInfoDto.getBirthDate();

        return incomeRepository.findByNameAndBirthDate(name, birthDate)
                .orElseThrow(() -> new CustomException(ErrorCode.MEMBER_NOT_FOUND)).getAmount();
    }

    public List<Long> getEstateCert(AuthInfoDto authInfoDto) {
        String name = authInfoDto.getName();
        Date birthDate = authInfoDto.getBirthDate();
        List<Estate> estates = estateRepository.findByNameAndBirthDate(name, birthDate);
        if(estates == null || estates.isEmpty()) {
            throw new CustomException(ErrorCode.MEMBER_NOT_FOUND);
        }

        return estates.stream().map(estate -> estate.getAmount()).collect(Collectors.toList());
    }

    public Map<String, Object> getHealthCert(AuthInfoDto authInfoDto) {
        String name = authInfoDto.getName();
        Date birthDate = authInfoDto.getBirthDate();

        Health health = healthRepository.findByNameAndBirthDate(name, birthDate)
                .orElseThrow(() -> new CustomException(ErrorCode.MEMBER_NOT_FOUND));

        Map<String, Object> result=new HashMap<>();
        result.put("value", health.getValue());
        result.put("date", health.getDate());
        return result;
    }

    public List<CertificateDto> getCertificateList() {
        List<Certificate> certificates = certificateRepository.findAll();
        List<CertificateDto> result = new ArrayList<>();
        certificates.forEach(certificate -> {
            result.add(CertificateDto.builder()
                    .certificateId(certificate.getId())
                    .name(certificate.getName())
                    .build());
        });
        return result;
    }
}
