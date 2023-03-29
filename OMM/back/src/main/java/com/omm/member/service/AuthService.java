package com.omm.member.service;

import com.google.gson.Gson;
import com.omm.member.model.dto.SubjectsDto;
import java.util.HashMap;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final RestTemplate restTemplate;

    public boolean verifyVP(String principal, String credential) {
        // Request Body를 생성합니다.
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        Gson gsonObj = new Gson();

        Map<String, String> requestBody = new HashMap<>();
        requestBody.put("holderDid", principal);
        requestBody.put("vpJwt", credential);

        HttpEntity<String> requestEntity = new HttpEntity<>(gsonObj.toJson(requestBody), headers);

        String url = "http://localhost:3000/api/did/presentation";
        HttpMethod httpMethod = HttpMethod.POST;

        try {
            ResponseEntity<String> responseEntity = restTemplate.exchange(url, httpMethod, requestEntity, String.class);
            String responseBody = responseEntity.getBody();

            SubjectsDto subjects = gsonObj.fromJson(responseBody, SubjectsDto.class);
            if (subjects.getSubjects().get("did").get("address").equals(principal)) {
                return true;
            } else {
                return false;
            }
        } catch (Exception e) {
            return false;
        }

    }

}
