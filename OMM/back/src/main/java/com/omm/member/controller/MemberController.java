package com.omm.member.controller;

import com.omm.member.model.dto.AuthDto;
import com.omm.member.model.dto.MemberCertDto;
import com.omm.member.model.dto.RegistDto;
import com.omm.member.model.request.*;
import com.omm.member.model.response.GetLikedMembersResponseDto;
import com.omm.member.service.AuthService;
import com.omm.member.service.MemberService;
import com.omm.util.SecurityUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/member")
@RequiredArgsConstructor
public class MemberController {

    private final MemberService memberService;
    private final AuthService authService;

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
     * @param authDto 인증을 위해서 필요한 정보, did 주소와 vp jwt를 받는다.
     * @return
     */
    @PostMapping
    public ResponseEntity<?> addMember(@RequestBody AuthDto authDto){
        RegistDto registDto = authService.registAuth(authDto);
        memberService.addMember(registDto);
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
        memberService.initMemberInfo(SecurityUtil.getCurrentDidAddress().get(), initMemberInfoRequestDto);
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

        memberService.initMemberFiltering(SecurityUtil.getCurrentDidAddress().get(), initMemberFilteringRequestDto);
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
        return new ResponseEntity<>(memberService.getMemberFiltering(SecurityUtil.getCurrentDidAddress().get()), HttpStatus.OK);
    }

    /**
     * 유저 이미지 업로드 함수
     *
     * @param uploadImageRequestDto 유저 이미지 업로드 폼
     * @return
     */
    @PostMapping("/img")
    public ResponseEntity<?> postMemberImages(@RequestBody UploadImageRequestDto uploadImageRequestDto) {
        memberService.postMemberImages(SecurityUtil.getCurrentDidAddress().get(), uploadImageRequestDto);
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
        memberService.putMemberImages(SecurityUtil.getCurrentDidAddress().get(), uploadImageRequestDto);
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
        memberService.putMemberInfo(SecurityUtil.getCurrentDidAddress().get(), putMemberInfoRequestDto);
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
        memberService.putMemberFiltering(SecurityUtil.getCurrentDidAddress().get(), putMemberFilteringRequestDto);
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
        memberService.putMemberLocation(SecurityUtil.getCurrentDidAddress().get(), putMemberLocationRequestDto);
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
        memberService.putMemberPr(SecurityUtil.getCurrentDidAddress().get(), putMemberPrRequestDto);
        return new ResponseEntity<>("유저 자기소개 수정에 성공했습니다.", HttpStatus.OK);
    }

    /**
     * 현재 로그인 유저 인증정보 가져오기
     *
     * @return
     */
    @GetMapping("/certificate")
    public ResponseEntity<?> getMemberCertificate() {
        return new ResponseEntity<>(memberService.getMemberCertificate(SecurityUtil.getCurrentDidAddress().get()), HttpStatus.OK);
    }

    /**
     * 유저 인증 정보 수정
     *
     * @param memberCertDto 요정된 인증수정 정보
     * @return
     */
    @PutMapping("/certificate")
    public ResponseEntity<?> putMemberCertificate(@RequestBody MemberCertDto memberCertDto) {
        // 인증서 가져오는 정보... 프론트에서 가져오는게 맞을까
        memberService.putMemberCertificate(SecurityUtil.getCurrentDidAddress().get(), memberCertDto);
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
        return new ResponseEntity<>(memberService.addInterest(SecurityUtil.getCurrentDidAddress().get(), postInterestRequestDto.getName()), HttpStatus.OK);
    }

    @GetMapping("/liked")
    public ResponseEntity<?> getLikedMembers(){
        return new ResponseEntity<>(memberService.getLikedMembers(SecurityUtil.getCurrentDidAddress().get()), HttpStatus.OK);
    }
}
