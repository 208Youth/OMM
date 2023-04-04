package com.cc24.service;

import com.cc24.exception.CustomException;
import com.cc24.model.dto.cert.request.CertRequestDto;
import com.cc24.model.dto.certificate.response.CertificateDto;
import com.cc24.model.dto.job.response.JobDto;
import com.cc24.model.dto.AuthInfoDto;
import com.cc24.model.dto.university.response.UniversityDto;
import com.cc24.model.entity.certificate.Authenticator;
import com.cc24.model.entity.certificate.Certificate;
import com.cc24.model.entity.estate.Estate;
import com.cc24.model.entity.health.Health;
import com.cc24.model.entity.job.Employee;
import com.cc24.model.entity.job.Job;
import com.cc24.model.entity.university.Student;
import com.cc24.model.entity.university.University;
import com.cc24.repository.certificate.AuthenticatorRepository;
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

import java.time.LocalDate;
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
    private final AuthenticatorRepository authenticatorRepository;


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

    public Map<String, Object> getUniversityCert(AuthInfoDto authInfoDto, Long universityId) {
        Student student = studentRepository
                .findByNameAndBirthDateAndGender(authInfoDto.getName(), authInfoDto.getBirthDate(), authInfoDto.getGender())
                .orElseThrow(() -> new CustomException(ErrorCode.MEMBER_NOT_FOUND));

        if(student.getUniversity().getId() != universityId) {
            throw new CustomException(ErrorCode.CANNOT_AUTHORIZE_MEMBER);
        }
        Map<String, Object> claims = new HashMap<>();
        claims.put("name", student.getUniversity().getName());

        return claims;
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

    public Map<String, Object> getJobCert(AuthInfoDto authInfoDto, Long jobId) {
        Employee employee = employeeRepository
                .findByNameAndBirthDateAndGender(authInfoDto.getName(), authInfoDto.getBirthDate(), authInfoDto.getGender())
                .orElseThrow(() -> new CustomException(ErrorCode.MEMBER_NOT_FOUND));

        if(employee.getJob().getId() != jobId) {
            throw new CustomException(ErrorCode.CANNOT_AUTHORIZE_MEMBER);
        }

        Map<String, Object> claims = new HashMap<>();
        claims.put("name", employee.getJob().getName());

        return claims;
    }

    public Map<String, Object> getIncomeCert(AuthInfoDto authInfoDto) {
        Long income = incomeRepository
                .findByNameAndBirthDateAndGender(authInfoDto.getName(), authInfoDto.getBirthDate(), authInfoDto.getGender())
                .orElseThrow(() -> new CustomException(ErrorCode.MEMBER_NOT_FOUND)).getAmount();

        Map<String, Object> claims = new HashMap<>();
        claims.put("income", income);

        return claims;
    }

    public Map<String, Object> getEstateCert(AuthInfoDto authInfoDto) {
        List<Estate> estates = estateRepository
                .findByNameAndBirthDateAndGender(authInfoDto.getName(), authInfoDto.getBirthDate(), authInfoDto.getGender());
        if(estates == null || estates.isEmpty()) {
            throw new CustomException(ErrorCode.MEMBER_NOT_FOUND);
        }

        List<Long> estateValues = estates.stream().map(estate -> estate.getAmount()).collect(Collectors.toList());

        Map<String, Object> claims = new HashMap<>();
        claims.put("estates", estateValues);

        return claims;
    }

    public Map<String, Object> getHealthCert(AuthInfoDto authInfoDto) {
        Health health = healthRepository
                .findByNameAndBirthDateAndGender(authInfoDto.getName(), authInfoDto.getBirthDate(), authInfoDto.getGender())
                .orElseThrow(() -> new CustomException(ErrorCode.MEMBER_NOT_FOUND));

        Map<String, Object> claims = new HashMap<>();
        claims.put("health", health.getValue());
        claims.put("date", health.getDate());

        return claims;
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

    public Map<String, Object> getCertificateCert(AuthInfoDto authInfoDto, Long certificateId) {
        Authenticator authenticator = authenticatorRepository
                .findByNameAndBirthDateAndGender(authInfoDto.getName(), authInfoDto.getBirthDate(), authInfoDto.getGender())
                .orElseThrow(() -> new CustomException(ErrorCode.MEMBER_NOT_FOUND));

        if(authenticator.getCertificate().getId() != certificateId) {
            throw new CustomException(ErrorCode.CANNOT_AUTHORIZE_MEMBER);
        }

        Map<String, Object> claims = new HashMap<>();
        claims.put("name", authenticator.getCertificate().getName());

        return claims;
    }

    public Map<String, Object> getCert(CertRequestDto certRequestDto) {
        String credentialName = certRequestDto.getCredentialName();
        String name = (String) certRequestDto.getPersonalId().get("name");
        String birthDate = (String) certRequestDto.getPersonalId().get("birthdate");
        String gender = (String) certRequestDto.getPersonalId().get("gender");
        AuthInfoDto authInfoDto = new AuthInfoDto(name, LocalDate.parse(birthDate), gender);
        Long id = null;
        Map<String, Object> claims;

        if (credentialName.contains("University") || credentialName.contains("Job") || credentialName.contains("Certificate")) {
            id = certRequestDto.getId();
        }

        switch (credentialName) {
            case "UniversityCredential":
                claims = getUniversityCert(authInfoDto, id);
                break;
            case "JobCredential":
                claims = getJobCert(authInfoDto, id);
                break;
            case "CertificateCredential":
                claims = getCertificateCert(authInfoDto, id);
                break;
            case "EstateCredential":
                claims = getEstateCert(authInfoDto);
                break;
            case "HealthCredential":
                claims = getHealthCert(authInfoDto);
                break;
            case "IncomeCredential":
                claims = getIncomeCert(authInfoDto);
                break;
            default:
                throw new CustomException(ErrorCode.INVALID_CREDENTIAL_NAME);
        }

        Map<String, Object> result = new HashMap<>();
        result.put("key", credentialName.replace("Credential", "").toLowerCase());
        result.put("claims", claims);

        return result;
    }

}
