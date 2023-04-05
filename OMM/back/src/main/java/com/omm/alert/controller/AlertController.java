package com.omm.alert.controller;

import com.omm.alert.model.dto.response.AlertResponseDto;
import com.omm.alert.service.AlertPublishService;
import com.omm.model.entity.Member;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/alert")
public class AlertController {
    private final AlertPublishService alertPublishService;
    @GetMapping("/chat")
    public ResponseEntity<?> getChatAlert() {
        Member myInfo = alertPublishService.getMember();
        AlertResponseDto alertResponseDto = new AlertResponseDto(alertPublishService.isChatAlertExist(myInfo));
        return new ResponseEntity<>(alertResponseDto, HttpStatus.OK);
    }

    @GetMapping("/noti")
    public ResponseEntity<?> getNotiAlert() {
        Member myInfo = alertPublishService.getMember();
        AlertResponseDto alertResponseDto = new AlertResponseDto(alertPublishService.isNotiAlertExist(myInfo));
        return new ResponseEntity<>(alertResponseDto, HttpStatus.OK);
    }
}
