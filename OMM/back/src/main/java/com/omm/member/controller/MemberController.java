package com.omm.member.controller;

import com.omm.member.model.dto.MemberCertDto;
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

//    /**
//     * 닉네임 중복 체크 함수
//     *
//     * @param checkNicknameRequestDto 닉네임 중복 체크 요청
//     * @return
//     */
//    @GetMapping("/nickname")
//    public ResponseEntity<?> checkNickname(@RequestBody CheckNicknameRequestDto checkNicknameRequestDto) {
//        boolean exist = memberService.existNickname(checkNicknameRequestDto.getNickname());
//        return new ResponseEntity<>(exist, HttpStatus.OK);
//    }

    /**
     * 회원 신규 등록
     * @param addMemberRequestDto 회원 등록 정보
     * @return
     */
    @PostMapping("/member")
    public ResponseEntity<?> addMember(@RequestBody AddMemberRequestDto addMemberRequestDto){
        memberService.addMember(addMemberRequestDto);
        return new ResponseEntity<>("회원 가입 성공", HttpStatus.OK);
    }

    /**
     * 회원 초기 등록 정보
     *
     * @param initMemberInfoRequestDto 회원 정보 객체
     * @return
     */
    @PostMapping("/info")
    public ResponseEntity<?> initMemberInfo(@RequestBody InitMemberInfoRequestDto initMemberInfoRequestDto) {
//        memberService.createMember(initMemberInfoRequestDto.getNickname());
        String currentMemberDidAddress = "0xa9f7ceead33163a2f7ec3f3c4deae42a6e8907c2"; // 테스트 데이터의 1번 회원

        memberService.initMemberInfo(currentMemberDidAddress, initMemberInfoRequestDto);
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
        String currentMemberDidAddress = "0xa9f7ceead33163a2f7ec3f3c4deae42a6e8907c2"; // 테스트 데이터의 1번 회원

        memberService.initMemberFiltering(currentMemberDidAddress, initMemberFilteringRequestDto);
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
        String currentMemberDidAddress = "0xa9f7ceead33163a2f7ec3f3c4deae42a6e8907c2"; // 테스트 데이터의 1번 회원
        return new ResponseEntity<>(memberService.getMemberFiltering(currentMemberDidAddress), HttpStatus.OK);
    }

    /**
     * 유저 이미지 업로드 함수
     *
     * @param uploadImageRequestDto 유저 이미지 업로드 폼
     * @return
     */
    @PostMapping("/img")
    public ResponseEntity<?> postMemberImages(@RequestBody UploadImageRequestDto uploadImageRequestDto) {
        String currentMemberDidAddress = "0xa9f7ceead33163a2f7ec3f3c4deae42a6e8907c2"; // 테스트 데이터의 1번 회원

        memberService.postMemberImages(currentMemberDidAddress, uploadImageRequestDto);
        return new ResponseEntity<>("사진 등록을 성공했습니다.", HttpStatus.OK);
    }

    /**
     * 유저 새 이미지로 교체
     *
     * @param uploadImageRequestDto 이미지 업로드 정보
     * @return
     */
    @PutMapping("/img")
    public ResponseEntity<?> putMemberImages(@RequestBody UploadImageRequestDto uploadImageRequestDto) {
        String currentMemberDidAddress = "0xa9f7ceead33163a2f7ec3f3c4deae42a6e8907c2"; // 테스트 데이터의 1번 회원

        memberService.putMemberImages(currentMemberDidAddress, uploadImageRequestDto);
        return new ResponseEntity<>("사진 교체에 성공했습니다.", HttpStatus.OK);
    }

    /**
     * 유저 정보 수정
     *
     * @param putMemberInfoRequestDto 요청된 수정 유저 정보
     * @return
     */
    @PutMapping("/info")
    public ResponseEntity<?> putMemberInfo(@RequestBody PutMemberInfoRequestDto putMemberInfoRequestDto) {
        String currentMemberDidAddress = "0xa9f7ceead33163a2f7ec3f3c4deae42a6e8907c2"; // 테스트 데이터의 1번 회원

        memberService.putMemberInfo(currentMemberDidAddress, putMemberInfoRequestDto);
        return new ResponseEntity<>("유저 정보 수정에 성공했습니다.", HttpStatus.OK);
    }

    /**
     * 유저 필터링 정보 수정
     *
     * @param putMemberFilteringRequestDto 요청된 수정 필터링 정보
     * @return
     */
    @PutMapping("/filtering")
    public ResponseEntity<?> putMemberFiltering(@RequestBody PutMemberFilteringRequestDto putMemberFilteringRequestDto) {
        String currentMemberDidAddress = "0xa9f7ceead33163a2f7ec3f3c4deae42a6e8907c2"; // 테스트 데이터의 1번 회원

        memberService.putMemberFiltering(currentMemberDidAddress, putMemberFilteringRequestDto);
        return new ResponseEntity<>("유저 필터링 정보 수정에 성공했습니다.", HttpStatus.OK);
    }

    /**
     * 유저 위치 정보 수정
     *
     * @param putMemberLocationRequestDto 요청 수정 위치 정보
     * @return
     */
    @PutMapping("/location")
    public ResponseEntity<?> putMemberLocation(@RequestBody PutMemberLocationRequestDto putMemberLocationRequestDto) {
        String currentMemberDidAddress = "0xa9f7ceead33163a2f7ec3f3c4deae42a6e8907c2"; // 테스트 데이터의 1번 회원

        memberService.putMemberLocation(currentMemberDidAddress, putMemberLocationRequestDto);
        return new ResponseEntity<>("유저 위치 정보 수정에 성공했습니다.", HttpStatus.OK);
    }

    /**
     * 유저 자기소개 수정
     *
     * @param putMemberPrRequestDto 수정 자기소개 정보
     * @return
     */
    @PutMapping("/pr")
    public ResponseEntity<?> putMemberPr(@RequestBody PutMemberPrRequestDto putMemberPrRequestDto) {
        String currentMemberDidAddress = "0xa9f7ceead33163a2f7ec3f3c4deae42a6e8907c2"; // 테스트 데이터의 1번 회원

        memberService.putMemberPr(currentMemberDidAddress, putMemberPrRequestDto);
        return new ResponseEntity<>("유저 자기소개 수정에 성공했습니다.", HttpStatus.OK);
    }

    /**
     * 현재 로그인 유저 인증정보 가져오기
     *
     * @return
     */
    @GetMapping("/certificate")
    public ResponseEntity<?> getMemberCertificate() {
        String currentMemberDidAddress = "0xa9f7ceead33163a2f7ec3f3c4deae42a6e8907c2"; // 테스트 데이터의 1번 회원
        return new ResponseEntity<>(memberService.getMemberCertificate(currentMemberDidAddress), HttpStatus.OK);
    }

    /**
     * 유저 인증 정보 수정
     *
     * @param memberCertDto 요정된 인증수정 정보
     * @return
     */
    @PutMapping("/certificate")
    public ResponseEntity<?> putMemberCertificate(@RequestBody MemberCertDto memberCertDto) {
        String currentMemberDidAddress = "0xa9f7ceead33163a2f7ec3f3c4deae42a6e8907c2"; // 테스트 데이터의 1번 회원
        //먼가의 로직 추가 필요

        memberService.putMemberCertificate(currentMemberDidAddress, memberCertDto);
        return new ResponseEntity<>("유저 인증정보 수정에 성공했습니다.", HttpStatus.OK);
    }

    /**
     * 유저 관심사 정보 가져오기
     *
     * @param memberId 멤버 아이디
     * @return
     */
    @GetMapping("/{member-id}/interest-list")
    public ResponseEntity<?> getMemberInterestList(@PathVariable("member-id") Long memberId) {
        return new ResponseEntity<>(memberService.getMemberInterestList(memberId), HttpStatus.OK);
    }

    /**
     * 관심사 정보 삭제
     *
     * @param deleteInterestRequestDto 관심사 정보 삭제 객체
     * @return
     */
    @DeleteMapping("/interest")
    public ResponseEntity<?> deleteInterest(@RequestBody DeleteInterestRequestDto deleteInterestRequestDto) {
        memberService.deleteInterest(deleteInterestRequestDto.getInterestListId());
        return new ResponseEntity<>("관심사 삭제에 성공했습니다.", HttpStatus.OK);
    }

    /**
     * 관심사 새로 등록
     * @param postInterestRequestDto 관심사 정보 객체
     * @return
     */
    @PostMapping("/interest")
    public ResponseEntity<?> addInterest(@RequestBody PostInterestRequestDto postInterestRequestDto) {
        String currentMemberDidAddress = "0xa9f7ceead33163a2f7ec3f3c4deae42a6e8907c2"; // 테스트 데이터의 1번 회원;
        return new ResponseEntity<>(memberService.addInterest(currentMemberDidAddress, postInterestRequestDto.getName()), HttpStatus.OK);
    }

}
