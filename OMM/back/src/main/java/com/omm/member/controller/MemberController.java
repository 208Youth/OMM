package com.omm.member.controller;

import com.omm.member.model.request.CheckNicknameRequest;
import com.omm.member.model.request.InitMemberInfoRequestDto;
import com.omm.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/member")
@RequiredArgsConstructor
public class MemberController {

    private final MemberService memberService;

    /**
     * 닉네임 중복 체크 함수
     *
     * @param checkNicknameRequest 닉네임 중복 체크 요청
     * @return
     */
    @GetMapping("/nickname")
    public ResponseEntity<?> checkNickname(@RequestBody CheckNicknameRequest checkNicknameRequest) {
        boolean exist = memberService.existNickname(checkNicknameRequest.getNickname());
        return new ResponseEntity<>(exist, HttpStatus.OK);
    }

//    @PostMapping
//    public ResponseEntity<?> uploadMemberImage(@RequestBody UploadImageRequestDto uploadImageRequestDto){
//
//    }

    /**
     * 회원 초기 등록 정보
     * @param initMemberInfoRequestDto 회원 정보 객체
     * @return
     */
    @PostMapping("/info")
    public ResponseEntity<?> initMemberInfo(@RequestBody InitMemberInfoRequestDto initMemberInfoRequestDto){
        memberService.initMemberInfo(initMemberInfoRequestDto);
        return new ResponseEntity<>("회원 등록 성공",HttpStatus.OK);
    }
}
