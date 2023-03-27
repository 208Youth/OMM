package com.omm.recommend.controller;

import com.omm.recommend.service.RecommendService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/recommend")
@RequiredArgsConstructor
public class RecommendController {

    private final RecommendService recommendService;

    @GetMapping("/")
    public ResponseEntity<?> getRecommendList(){
        // 현재 유저의 정보를 얻어온다
        String currentUserNickname = "김미미";
        return new ResponseEntity<>(recommendService.getRecommendList(currentUserNickname), HttpStatus.OK);
    }
}
