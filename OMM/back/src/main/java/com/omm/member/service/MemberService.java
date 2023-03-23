package com.omm.member.service;

import com.omm.exception.member.MemberExceptionCode;
import com.omm.exception.member.MemberRuntimeException;
import com.omm.member.model.request.InitMemberFilteringRequestDto;
import com.omm.member.model.request.InitMemberInfoRequestDto;
import com.omm.member.model.request.UploadImageRequestDto;
import com.omm.member.model.response.GetMemberFilteringResponseDto;
import com.omm.member.model.response.GetMemberInfoResponseDto;
import com.omm.member.repository.FilteringRepository;
import com.omm.member.repository.MemberImgRepository;
import com.omm.member.repository.MemberRepository;
import com.omm.member.repository.MyInfoRepository;
import com.omm.model.entity.Filtering;
import com.omm.model.entity.Member;
import com.omm.model.entity.MemberImg;
import com.omm.model.entity.MyInfo;
import com.omm.model.entity.enums.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.sql.Blob;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class MemberService {
    private final MemberRepository memberRepository;

    private final MyInfoRepository myInfoRepository;

    private final FilteringRepository filteringRepository;

    private final MemberImgRepository memberImgRepository;

    /**
     * 닉네임 중복 체크 함수
     *
     * @param nickname 닉네임
     * @return
     */
    public boolean existNickname(String nickname) {
        return memberRepository.existsByNickname(nickname);
    }

    public void createMember(String memberNickname) {
        try {
            Member member = Member.builder()
                    .nickname(memberNickname)
                    .build();
            memberRepository.save(member);
        } catch (Exception e) {
            throw new MemberRuntimeException(MemberExceptionCode.MEMBER_INPUT_TYPE_WRONG);
        }
    }

    /**
     * 초기 회원 정보 설정 함수
     *
     * @param initMemberInfoRequestDto 초기 회원 정보
     */
    public void initMemberInfo(InitMemberInfoRequestDto initMemberInfoRequestDto) {

        // 초기 유저 설정이 닉네임 기준으로 찾아서 해야 하는데, 이 시점에 닉네임이 있는지 확인해야 함.
        Member member = memberRepository.findByNickname(initMemberInfoRequestDto.getNickname())
                .orElseThrow(() -> new MemberRuntimeException(MemberExceptionCode.MEMBER_NOT_EXISTS));

        try {
            MyInfo myInfo = MyInfo.builder()
                    .member(member)
                    .lat(initMemberInfoRequestDto.getLat())
                    .lng(initMemberInfoRequestDto.getLng())
                    .pr(initMemberInfoRequestDto.getPr())
                    .height(initMemberInfoRequestDto.getHeight())
                    .contactStyle(InfoContactStyle.valueOf(initMemberInfoRequestDto.getContactStyle()))
                    .drinkingStyle(InfoDrinkingStyle.valueOf(initMemberInfoRequestDto.getDrinkingStyle()))
                    .smokingStyle(InfoSmokingStyle.valueOf((initMemberInfoRequestDto.getSmokingStyle())))
                    .military(InfoMilitary.valueOf(initMemberInfoRequestDto.getMilitary()))
                    .pet(InfoPet.valueOf(initMemberInfoRequestDto.getPet()))
                    .mbti(InfoMBTI.valueOf(initMemberInfoRequestDto.getMbti()))
                    .build();

            myInfoRepository.save(myInfo);
        } catch (Exception e) {
            throw new MemberRuntimeException(MemberExceptionCode.MEMBER_INPUT_TYPE_WRONG);
        }
    }


    /**
     * 멤버의 초기 필터링 정보 설정
     *
     * @param currentMemberNickname         현재 유저 닉네임
     * @param initMemberFilteringRequestDto 등록 정보
     */
    public void initMemberFiltering(String currentMemberNickname, InitMemberFilteringRequestDto initMemberFilteringRequestDto) {

        Member member = memberRepository.findByNickname(currentMemberNickname)
                .orElseThrow(() -> new MemberRuntimeException(MemberExceptionCode.MEMBER_NOT_EXISTS));

        try {
            Filtering filtering = Filtering.builder()
                    .member(member)
                    .ageMin(initMemberFilteringRequestDto.getAgeMin())
                    .ageMax(initMemberFilteringRequestDto.getAgeMax())
                    .heightMin(initMemberFilteringRequestDto.getHeightMin())
                    .heightMax(initMemberFilteringRequestDto.getHeightMax())
                    .rangeMin(initMemberFilteringRequestDto.getRangeMin())
                    .rangeMax(initMemberFilteringRequestDto.getRangeMax())
                    .contactStyle(FilterContactStyle.valueOf(initMemberFilteringRequestDto.getContactStyle()))
                    .drinkingStyle(FilterDrinkingStyle.valueOf(initMemberFilteringRequestDto.getDrinkingStyle()))
                    .smokingStyle(FilterSmokingStyle.valueOf(initMemberFilteringRequestDto.getSmokingStyle()))
                    .build();

            filteringRepository.save(filtering);

        } catch (Exception e) {
            throw new MemberRuntimeException(MemberExceptionCode.MEMBER_INPUT_TYPE_WRONG);
        }
    }

    /**
     * 특정 멤버의 정보를 조회
     * @param memberId 멤버의 아이디
     * @return
     */
    public GetMemberInfoResponseDto getMemberInfo(Long memberId) {
        Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new MemberRuntimeException(MemberExceptionCode.MEMBER_NOT_EXISTS));

        MyInfo myInfo = myInfoRepository.findByMember(member)
                .orElseThrow(() -> new MemberRuntimeException(MemberExceptionCode.MEMBER_INFO_NOT_EXISTS));

        List<MemberImg> memberimgs = memberImgRepository.findAllById(memberId);
        List<Blob> memberimgsblobs = new ArrayList<>();

        for (MemberImg memberimg : memberimgs) {
            memberimgsblobs.add(memberimg.getImageContent());
        }

        try {
            GetMemberInfoResponseDto getMemberInfoResponseDto = GetMemberInfoResponseDto.builder()
                    .nickname(member.getNickname())
                    .lat(myInfo.getLat())
                    .lng(myInfo.getLng())
                    .pr(myInfo.getPr())
                    .height(myInfo.getHeight())
                    .contactStyle(myInfo.getContactStyle().name())
                    .drinkingStyle(myInfo.getDrinkingStyle().name())
                    .smokingStyle(myInfo.getSmokingStyle().name())
                    .military(myInfo.getMilitary().name())
                    .pet(myInfo.getPet().name())
                    .mbti(myInfo.getMbti().name())
                    .profileimgs(memberimgsblobs)
                    .build();
            return getMemberInfoResponseDto;
        } catch (Exception e) {
            throw new MemberRuntimeException(MemberExceptionCode.MEMBER_INFO_NOT_EXISTS);
        }
    }

    /**
     * 특정 유저의 (실질적으로는 현재 로그인 유저의) 필터링 정보 조회
     * @param currentMemberNickname 현재 멤버 닉네임
     * @return
     */
    public GetMemberFilteringResponseDto getMemberFiltering(String currentMemberNickname) {
        Member member = memberRepository.findByNickname(currentMemberNickname)
                .orElseThrow(()-> new MemberRuntimeException(MemberExceptionCode.MEMBER_NOT_EXISTS));

        Filtering filtering = filteringRepository.findByMember(member)
                .orElseThrow(()-> new MemberRuntimeException(MemberExceptionCode.MEMBER_FILTERING_NOT_EXISTS));
        
        try{
            GetMemberFilteringResponseDto getMemberFilteringResponseDto = GetMemberFilteringResponseDto.builder()
                    .ageMin(filtering.getAgeMin())
                    .ageMax(filtering.getAgeMax())
                    .heightMin(filtering.getHeightMin())
                    .heightMax(filtering.getHeightMax())
                    .rangeMin(filtering.getRangeMin())
                    .rangeMax(filtering.getRangeMax())
                    .contactStyle(filtering.getContactStyle().name())
                    .drinkingStyle(filtering.getDrinkingStyle().name())
                    .smokingStyle(filtering.getSmokingStyle().name())
                    .build();
            return getMemberFilteringResponseDto;
        } catch (Exception e){
            throw new MemberRuntimeException(MemberExceptionCode.MEMBER_FILTERING_NOT_EXISTS);
        }
    }

    /**
     * 유저 이미지 업로드 함수
     * @param currentMemberNickname 현재 로그인 유저 닉네임
     * @param uploadImageRequestDto 업로드 폼
     */
    public void postMemberImages(String currentMemberNickname, UploadImageRequestDto uploadImageRequestDto) {
        Member member = memberRepository.findByNickname(currentMemberNickname)
                .orElseThrow(()-> new MemberRuntimeException(MemberExceptionCode.MEMBER_NOT_EXISTS));

        try{
            List<Blob> images = uploadImageRequestDto.getImages();

            images.forEach((image)->{
                MemberImg memberImg = MemberImg.builder()
                        .member(member)
                        .imageContent(image)
                        .build();
                memberImgRepository.save(memberImg);
            });
        } catch (Exception e){
            throw new MemberRuntimeException(MemberExceptionCode.MEMBER_IMAGE_UPLOAD_FAILED);
        }
    }
}