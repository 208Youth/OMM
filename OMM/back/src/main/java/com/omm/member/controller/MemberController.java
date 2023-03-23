package com.omm.member.controller;

import com.omm.member.model.request.*;
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
     *
     * @param initMemberInfoRequestDto 회원 정보 객체
     * @return
     */
    @PostMapping("/info")
    public ResponseEntity<?> initMemberInfo(@RequestBody InitMemberInfoRequestDto initMemberInfoRequestDto) {
        memberService.createMember(initMemberInfoRequestDto.getNickname());
        memberService.initMemberInfo(initMemberInfoRequestDto);
        return new ResponseEntity<>("회원 등록 성공", HttpStatus.OK);
    }

    /**
     * 유저 초기 정보 설정
     *
     * @param initMemberFilteringRequestDto 유저 초기 정보 객체
     * @return
     */
    @PostMapping("/filtering")
    public ResponseEntity<?> initMemberFiltering(@RequestBody InitMemberFilteringRequestDto initMemberFilteringRequestDto) {
        // 유저 생성
        String currentMemberNickname = "김미미";

        memberService.initMemberFiltering(currentMemberNickname, initMemberFilteringRequestDto);
        return new ResponseEntity<>("선호 상대 정보 등록 성공", HttpStatus.OK);
    }

    /**
     * 특정 유저의 정보 조희
     *
     * @param memberId 멤버의 아이디
     * @return
     */
    @GetMapping("/{member-id}")
    public ResponseEntity<?> getMemberInfo(@PathVariable("member-id") Long memberId) {
        return new ResponseEntity<>(memberService.getMemberInfo(memberId), HttpStatus.OK);
    }

    /**
     * 현재 유저의 필터링 정보 조회
     *
     * @return
     */
    @GetMapping("/filtering")
    public ResponseEntity<?> getMemberFiltering() {
        String currentMemberNickname = "김미미";
        return new ResponseEntity<>(memberService.getMemberFiltering(currentMemberNickname), HttpStatus.OK);
    }

    /**
     * 유저 이미지 업로드 함수
     *
     * @param uploadImageRequestDto 유저 이미지 업로드 폼
     * @return
     */
    @PostMapping("/img")
    public ResponseEntity<?> postMemberImages(@RequestBody UploadImageRequestDto uploadImageRequestDto) {
        String currentMemberNickname = "김미미";

        memberService.postMemberImages(currentMemberNickname, uploadImageRequestDto);
        return new ResponseEntity<>("사진 등록을 성공했습니다.", HttpStatus.OK);
    }

    /**
     * 유저 새 이미지로 교체
     * @param uploadImageRequestDto 이미지 업로드 정보
     * @return
     */
    @PutMapping("/img")
    public ResponseEntity<?> putMemberImages(@RequestBody UploadImageRequestDto uploadImageRequestDto) {
        String currentMemberNickname = "김미미";

        memberService.putMemberImages(currentMemberNickname, uploadImageRequestDto);
        return new ResponseEntity<>("사진 교체에 성공했습니다.", HttpStatus.OK);
    }

    /**
     * 유저 정보 수정
     * @param putMemberInfoRequestDto 요청된 수정 유저 정보
     * @return
     */
    @PutMapping("/info")
    public ResponseEntity<?> putMemberInfo(@RequestBody PutMemberInfoRequestDto putMemberInfoRequestDto) {
        String currentMemberNickname = "김미미";

        memberService.putMemberInfo(currentMemberNickname, putMemberInfoRequestDto);
        return new ResponseEntity<>("유저 정보 수정에 성공했습니다.", HttpStatus.OK);
    }

    /**
     * 유저 필터링 정보 수정
     * @param putMemberFilteringRequestDto 요청된 수정 필터링 정보
     * @return
     */
    @PutMapping("/filtering")
    public ResponseEntity<?> putMemberFiltering(@RequestBody PutMemberFilteringRequestDto putMemberFilteringRequestDto) {
        String currentMemberNickname = "김미미";

        memberService.putMemberFiltering(currentMemberNickname, putMemberFilteringRequestDto);
        return new ResponseEntity<>("유저 필터링 정보 수정에 성공했습니다.", HttpStatus.OK);
    }

    /**
     * 유저 위치 정보 수정
     * @param putMemberLocation 요청 수정 위치 정보
     * @return
     */
    @PutMapping("/location")
    public ResponseEntity<?> putMemberLocation(@RequestBody PutMemberLocation putMemberLocation) {
        String currentMemberNickname = "김미미";

        memberService.putMemberLocation(currentMemberNickname, putMemberLocation);
        return new ResponseEntity<>("유저 위치 정보 수정에 성공했습니다.", HttpStatus.OK);
    }
}
