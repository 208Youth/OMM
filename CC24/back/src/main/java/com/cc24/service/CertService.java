package com.cc24.service;

import com.cc24.model.dto.university.response.UniversityDto;
import com.cc24.model.entity.university.University;
import com.cc24.repository.CertRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class CertService {
    private final CertRepository certRepository;

    public List<UniversityDto> getUniversityList() {
        List<University> universities=certRepository.findAll();
        List<UniversityDto> result=new ArrayList<>();
        universities.forEach(university -> {
            result.add(UniversityDto.builder()
                            .university_id(university.getId())
                            .name(university.getName())
                            .build());
        });
        return result;
    }
}
