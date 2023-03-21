package com.cc24.service;

import com.cc24.exception.CustomException;
import com.cc24.model.dto.university.AuthInfoDto;
import com.cc24.model.dto.university.response.UniversityDto;
import com.cc24.model.entity.university.Student;
import com.cc24.model.entity.university.University;
import com.cc24.repository.university.StudentRepository;
import com.cc24.repository.university.UniversityRepository;
import com.cc24.util.error.ErrorCode;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
@RequiredArgsConstructor
public class CertService {
    private final UniversityRepository universityRepository;
    private final StudentRepository studentRepository;

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
}
