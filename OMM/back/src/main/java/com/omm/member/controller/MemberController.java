package com.omm.member.controller;

import com.omm.member.model.request.CheckNicknameRequest;
import com.omm.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/member")
@RequiredArgsConstructor
public class MemberController {

    private final MemberService memberService;

    /**
     * 닉네임 중복 체크 함수
     * @param checkNicknameRequest 닉네임 중복 체크 요청
     * @return
     */
    @GetMapping("/nickname")
    public ResponseEntity<?> checkNickname(@RequestBody CheckNicknameRequest checkNicknameRequest){
        boolean exist = memberService.existNickname(checkNicknameRequest.getNickname());
        return new ResponseEntity<>(exist, HttpStatus.OK);
    }
}
