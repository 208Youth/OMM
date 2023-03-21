package com.cc24.controller;

import com.cc24.model.dto.university.response.UniversityDto;
import com.cc24.service.CertService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/cert")
@RequiredArgsConstructor
public class CertController {
    private final CertService certService;

    @GetMapping("/university")
    public ResponseEntity<?> getUniversityList() {
        Map<String, Object> result = new HashMap<>();
        result.put("list", certService.getUniversityList());
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

}
