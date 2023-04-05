package com.omm.member.service;

import com.omm.exception.CustomException;
import com.omm.exception.member.MemberExceptionCode;
import com.omm.exception.member.MemberRuntimeException;
import com.omm.member.model.dto.*;
import com.omm.member.model.request.*;
import com.omm.member.model.response.*;
import com.omm.model.entity.*;
import com.omm.model.entity.enums.*;
import com.omm.repository.*;
import com.omm.util.error.ErrorCode;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class MemberService {

    private final MemberRepository memberRepository;

    private final MyInfoRepository myInfoRepository;

    private final FilteringRepository filteringRepository;

    private final MemberImgRepository memberImgRepository;

    private final MemberCertRepository memberCertRepository;

    private final InterestRepository interestRepository;

    private final InterestListRepository interestListRepository;

    public void changeNickname(String currentMemberDidAddress,String nickname) {
        Member member = memberRepository.findByDidAddress(currentMemberDidAddress)
            .orElseThrow(() -> new MemberRuntimeException(MemberExceptionCode.MEMBER_NOT_EXISTS));

        try {
            member.setNickname(nickname);
            memberRepository.save(member);
        } catch (Exception e) {
            throw new MemberRuntimeException(MemberExceptionCode.MEMBER_INPUT_TYPE_WRONG);
        }
    }
    /**
     * did address 중복 체크 함수
     *
     * @param didAddress 닉네임
     * @return
     */
    public boolean existDidAddress(String didAddress) {
        try {
            return memberRepository.existsByDidAddress(didAddress);
        } catch (Exception e) {
            throw new MemberRuntimeException(MemberExceptionCode.MEMBER_INPUT_TYPE_WRONG);
        }
    }

    /**
     * 회원 추가
     *
     * @param registDto
     */
    public void addMember(RegistDto registDto) {
        try {
            if (existDidAddress(registDto.getHolderDid())) {
                throw new MemberRuntimeException(MemberExceptionCode.MEMBER_ALREADY_EXIST);
            }
            Member member = Member.builder()
                .didAddress(registDto.getHolderDid())
                .age(registDto.getAge())
                .gender(registDto.getGender())
                .imageUrl(registDto.getImageUrl())
                .build();
            System.out.println(member.toString());
            memberRepository.save(member);
        } catch (Exception e) {
            throw new MemberRuntimeException(MemberExceptionCode.MEMBER_INPUT_TYPE_WRONG);
        }
    }

    /**
     * 현재 유저의 사진 정보 조희 (인증용)
     *
     * @return
     */
    public GetMemberImageUrlResponseDto getUserFaceUrl(String didAddress) {
        return GetMemberImageUrlResponseDto.builder()
            .didAddress(didAddress)
            .faceUrl(memberRepository.findByDidAddress(didAddress).orElseThrow(
                    () -> new MemberRuntimeException(MemberExceptionCode.MEMBER_NOT_EXISTS))
                .getImageUrl())
            .build();
    }

    /**
     * 초기 회원 정보 설정 함수
     *
     * @param currentMemberDidAddress
     * @param initMemberInfoRequestDto 초기 회원 정보
     */
    public void initMemberInfo(String currentMemberDidAddress,
        InitMemberInfoRequestDto initMemberInfoRequestDto) {

        Member member = memberRepository.findByDidAddress(currentMemberDidAddress)
            .orElseThrow(() -> new MemberRuntimeException(MemberExceptionCode.MEMBER_NOT_EXISTS));

        try {
            member.setNickname(initMemberInfoRequestDto.getNickname());
            memberRepository.save(member);

            MyInfo myInfo = myInfoRepository.findByMember(member)
                .orElseThrow(
                    () -> new MemberRuntimeException(MemberExceptionCode.MEMBER_NOT_EXISTS));

            myInfo.setLat(initMemberInfoRequestDto.getLat());
            myInfo.setLng(initMemberInfoRequestDto.getLng());
            myInfo.setHeight(initMemberInfoRequestDto.getHeight());
            myInfo.setContactStyle(
                InfoContactStyle.valueOf(initMemberInfoRequestDto.getContactStyle()));
            myInfo.setDrinkingStyle(
                InfoDrinkingStyle.valueOf(initMemberInfoRequestDto.getDrinkingStyle()));
            myInfo.setSmokingStyle(
                InfoSmokingStyle.valueOf((initMemberInfoRequestDto.getSmokingStyle())));
            myInfo.setMilitary(InfoMilitary.valueOf(initMemberInfoRequestDto.getMilitary()));
            myInfo.setPet(InfoPet.valueOf(initMemberInfoRequestDto.getPet()));
            myInfo.setMbti(InfoMBTI.valueOf(initMemberInfoRequestDto.getMbti()));

            myInfoRepository.save(myInfo);
        } catch (Exception e) {
            throw new MemberRuntimeException(MemberExceptionCode.MEMBER_INPUT_TYPE_WRONG);
        }
    }


    /**
     * 멤버의 초기 필터링 정보 설정
     *
     * @param currentMemberDidAddress 현재 유저 did 주소
     * @param memberFilteringDto      등록 정보
     */
    public void initMemberFiltering(String currentMemberDidAddress,
        MemberFilteringDto memberFilteringDto) {

        Member member = memberRepository.findByDidAddress(currentMemberDidAddress)
            .orElseThrow(() -> new MemberRuntimeException(MemberExceptionCode.MEMBER_NOT_EXISTS));

        try {
            Filtering filtering = filteringRepository.findByMember(member)
                .orElseThrow(
                    () -> new MemberRuntimeException(MemberExceptionCode.MEMBER_NOT_EXISTS));

            filtering.setAgeMin(memberFilteringDto.getAgeMin());
            filtering.setAgeMax(memberFilteringDto.getAgeMax());
            filtering.setHeightMin(memberFilteringDto.getHeightMin());
            filtering.setHeightMax(memberFilteringDto.getHeightMax());
            filtering.setRangeMin(memberFilteringDto.getRangeMin());
            filtering.setRangeMax(memberFilteringDto.getRangeMax());
            filtering.setContactStyle(
                FilterContactStyle.valueOf(memberFilteringDto.getContactStyle()));
            filtering.setDrinkingStyle(
                FilterDrinkingStyle.valueOf(memberFilteringDto.getDrinkingStyle()));
            filtering.setSmokingStyle(
                FilterSmokingStyle.valueOf(memberFilteringDto.getSmokingStyle()));

            filteringRepository.save(filtering);

        } catch (Exception e) {
            throw new MemberRuntimeException(MemberExceptionCode.MEMBER_INPUT_TYPE_WRONG);
        }
    }

    /**
     * 특정 멤버의 정보를 조회
     *
     * @param memberId 멤버의 아이디
     * @return
     */
    public GetMemberInfoResponseDto getMemberInfo(Long memberId) {
        Member member = memberRepository.findById(memberId)
            .orElseThrow(() -> new MemberRuntimeException(MemberExceptionCode.MEMBER_NOT_EXISTS));

        MyInfo myInfo = myInfoRepository.findByMember(member)
            .orElseThrow(
                () -> new MemberRuntimeException(MemberExceptionCode.MEMBER_INFO_NOT_EXISTS));

        List<MemberImg> memberimgs = memberImgRepository.findAllByMember(member);
        List<byte[]> memberimgsblobs = new ArrayList<>();

        for (MemberImg memberimg : memberimgs) {
            memberimgsblobs.add(memberimg.getImageContent());
        }

        try {
            GetMemberInfoResponseDto getMemberInfoResponseDto = GetMemberInfoResponseDto.builder()
                .nickname(member.getNickname())
                .age(member.getAge())
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
     * 현재 유저 정보를 조회
     *
     * @param currentUserDidAddress 멤버의 아이디
     * @return
     */
    public GetMemberInfoResponseDto getMyInfo(String currentUserDidAddress) {
        Member member = memberRepository.findByDidAddress(currentUserDidAddress)
            .orElseThrow(() -> new MemberRuntimeException(MemberExceptionCode.MEMBER_NOT_EXISTS));

        MyInfo myInfo = myInfoRepository.findByMember(member)
            .orElseThrow(
                () -> new MemberRuntimeException(MemberExceptionCode.MEMBER_INFO_NOT_EXISTS));

        List<MemberImg> memberimgs = memberImgRepository.findAllByMember(member);
        List<byte[]> memberimgsblobs = new ArrayList<>();

        for (MemberImg memberimg : memberimgs) {
            memberimgsblobs.add(memberimg.getImageContent());
        }

        try {
            GetMemberInfoResponseDto getMemberInfoResponseDto = GetMemberInfoResponseDto.builder()
                .nickname(member.getNickname())
                .age(member.getAge())
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
     *
     * @param currentMemberDidAddress 현재 멤버 did주소
     * @return
     */
    public GetMemberFilteringResponseDto getMemberFiltering(String currentMemberDidAddress) {
        Member member = memberRepository.findByDidAddress(currentMemberDidAddress)
            .orElseThrow(() -> new MemberRuntimeException(MemberExceptionCode.MEMBER_NOT_EXISTS));

        Filtering filtering = filteringRepository.findByMember(member)
            .orElseThrow(
                () -> new MemberRuntimeException(MemberExceptionCode.MEMBER_FILTERING_NOT_EXISTS));

        try {
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
        } catch (Exception e) {
            throw new MemberRuntimeException(MemberExceptionCode.MEMBER_FILTERING_NOT_EXISTS);
        }
    }


    /**
     * 유저 이미지 등록 (사용하지 말 것)
     *
     * @param currentMemberDidAddress
     * @param data
     */
    public void postMemberImages(String currentMemberDidAddress, List<byte[]> data) {
        Member member = memberRepository.findByDidAddress(currentMemberDidAddress)
            .orElseThrow(() -> new MemberRuntimeException(MemberExceptionCode.MEMBER_NOT_EXISTS));

        try {
            data.forEach((image) -> {
                MemberImg memberImg = MemberImg.builder()
                    .member(member)
                    .imageContent(image)
                    .build();
                memberImgRepository.save(memberImg);
            });
        } catch (Exception e) {
            throw new MemberRuntimeException(MemberExceptionCode.MEMBER_IMAGE_UPLOAD_FAILED);
        }
    }


    /**
     * 이미지 교체 함수
     *
     * @param currentMemberDidAddress
     * @param data
     */
    public void putMemberImages(String currentMemberDidAddress, List<byte[]> data) {
        Member member = memberRepository.findByDidAddress(currentMemberDidAddress)
            .orElseThrow(() -> new MemberRuntimeException(MemberExceptionCode.MEMBER_NOT_EXISTS));

        try {
            List<MemberImg> memberImages = memberImgRepository.findAllByMember(member);

//            memberImages.forEach((img) -> {
//                System.out.println(img.toString());
//            });

            memberImgRepository.deleteAll(memberImages);
        } catch (Exception e) {
            throw new MemberRuntimeException(MemberExceptionCode.MEMBER_IMAGE_DELETE_FAILED);
        }

        try {

            data.forEach((image) -> {
                MemberImg memberImg = MemberImg.builder()
                    .member(member)
                    .imageContent(image)
                    .build();
                memberImgRepository.save(memberImg);
            });
        } catch (Exception e) {
            throw new MemberRuntimeException(MemberExceptionCode.MEMBER_IMAGE_UPLOAD_FAILED);
        }
    }

    /**
     * 유저 정보 수정 로직
     *
     * @param currentMemberDidAddress 현재 로그인 유저
     * @param putMemberInfoRequestDto 수정 유저 정보 객체
     */
    public void putMemberInfo(String currentMemberDidAddress,
        PutMemberInfoRequestDto putMemberInfoRequestDto) {
        Member member = memberRepository.findByDidAddress(currentMemberDidAddress)
            .orElseThrow(() -> new MemberRuntimeException(MemberExceptionCode.MEMBER_NOT_EXISTS));

        MyInfo myInfo = myInfoRepository.findByMember(member)
            .orElseThrow(
                () -> new MemberRuntimeException(MemberExceptionCode.MEMBER_INFO_NOT_EXISTS));

        try {
            member.setNickname(putMemberInfoRequestDto.getNickname());

            myInfo.setHeight(putMemberInfoRequestDto.getHeight());
            myInfo.setContactStyle(
                InfoContactStyle.valueOf(putMemberInfoRequestDto.getContactStyle()));
            myInfo.setDrinkingStyle(
                InfoDrinkingStyle.valueOf(putMemberInfoRequestDto.getDrinkingStyle()));
            myInfo.setSmokingStyle(
                InfoSmokingStyle.valueOf(putMemberInfoRequestDto.getSmokingStyle()));
            myInfo.setMilitary(InfoMilitary.valueOf(putMemberInfoRequestDto.getMilitary()));
            myInfo.setPet(InfoPet.valueOf(putMemberInfoRequestDto.getPet()));
            myInfo.setMbti(InfoMBTI.valueOf(putMemberInfoRequestDto.getMbti()));

            memberRepository.save(member);
            myInfoRepository.save(myInfo);

        } catch (Exception e) {
            throw new MemberRuntimeException(MemberExceptionCode.MEMBER_INPUT_TYPE_WRONG);
        }

    }

    /**
     * 멤버 필터링 정보 수정
     *
     * @param currentMemberDidAddress 현재 로그인 유저
     * @param memberFilteringDto      필터링 정보 객체
     */
    public void putMemberFiltering(String currentMemberDidAddress,
        MemberFilteringDto memberFilteringDto) {
        Member member = memberRepository.findByDidAddress(currentMemberDidAddress)
            .orElseThrow(() -> new MemberRuntimeException(MemberExceptionCode.MEMBER_NOT_EXISTS));

        Filtering filtering = filteringRepository.findByMember(member)
            .orElseThrow(
                () -> new MemberRuntimeException(MemberExceptionCode.MEMBER_FILTERING_NOT_EXISTS));

        try {
            filtering.setAgeMin(memberFilteringDto.getAgeMin());
            filtering.setAgeMax(memberFilteringDto.getAgeMax());
            filtering.setHeightMin(memberFilteringDto.getHeightMin());
            filtering.setHeightMax(memberFilteringDto.getHeightMax());
            filtering.setRangeMin(memberFilteringDto.getRangeMin());
            filtering.setRangeMax(memberFilteringDto.getRangeMax());
            filtering.setContactStyle(
                FilterContactStyle.valueOf(memberFilteringDto.getContactStyle()));
            filtering.setDrinkingStyle(
                FilterDrinkingStyle.valueOf(memberFilteringDto.getDrinkingStyle()));
            filtering.setSmokingStyle(
                FilterSmokingStyle.valueOf(memberFilteringDto.getSmokingStyle()));

            filteringRepository.save(filtering);
        } catch (Exception e) {
            throw new MemberRuntimeException(MemberExceptionCode.MEMBER_INPUT_TYPE_WRONG);
        }

    }

    /**
     * 유저 위치 정보 수정
     *
     * @param currentMemberDidAddress     현재 로그인 유저
     * @param putMemberLocationRequestDto 요청 유저 수정 위치 정보
     */
    public void putMemberLocation(String currentMemberDidAddress,
        PutMemberLocationRequestDto putMemberLocationRequestDto) {
        Member member = memberRepository.findByDidAddress(currentMemberDidAddress)
            .orElseThrow(() -> new MemberRuntimeException(MemberExceptionCode.MEMBER_NOT_EXISTS));

        MyInfo myInfo = myInfoRepository.findByMember(member)
            .orElseThrow(
                () -> new MemberRuntimeException(MemberExceptionCode.MEMBER_INFO_NOT_EXISTS));

        try {
            myInfo.setLat(putMemberLocationRequestDto.getLat());
            myInfo.setLng(putMemberLocationRequestDto.getLng());

            myInfoRepository.save(myInfo);
        } catch (Exception e) {
            throw new MemberRuntimeException(MemberExceptionCode.MEMBER_INPUT_TYPE_WRONG);
        }

    }

    /**
     * 유저 자기소개 수정
     *
     * @param currentMemberDidAddress 현재 로그인 유저 닉네임
     * @param putMemberPrRequestDto   수정 자기소개 정보
     */
    public void putMemberPr(String currentMemberDidAddress,
        PutMemberPrRequestDto putMemberPrRequestDto) {
        Member member = memberRepository.findByDidAddress(currentMemberDidAddress)
            .orElseThrow(() -> new MemberRuntimeException(MemberExceptionCode.MEMBER_NOT_EXISTS));

        MyInfo myInfo = myInfoRepository.findByMember(member)
            .orElseThrow(
                () -> new MemberRuntimeException(MemberExceptionCode.MEMBER_INFO_NOT_EXISTS));

        try {
            myInfo.setPr(putMemberPrRequestDto.getPr());
            myInfoRepository.save(myInfo);
        } catch (Exception e) {
            throw new MemberRuntimeException(MemberExceptionCode.MEMBER_INPUT_TYPE_WRONG);
        }
    }

    /**
     * 현재 유저 인증정보 가져오기
     *
     * @param currentMemberDidAddress 현재 로그인 유저
     * @return
     */
    public MemberCertDto getMyCertificate(String currentMemberDidAddress) {
        Member member = memberRepository.findByDidAddress(currentMemberDidAddress)
            .orElseThrow(() -> new MemberRuntimeException(MemberExceptionCode.MEMBER_NOT_EXISTS));

        MemberCert memberCert = memberCertRepository.findByMember(member)
            .orElseThrow(
                () -> new MemberRuntimeException(MemberExceptionCode.MEMBER_INFO_NOT_EXISTS));

        try {
            MemberCertDto memberCertDto = MemberCertDto.builder()
                .university(memberCert.isUniversity())
                .universityName(memberCert.getUniversityName())
                .job(memberCert.isJob())
                .jobNames(memberCert.getJobNames())
                .certificate(memberCert.isCertificate())
                .certificateNames(memberCert.getCertificateNames())
                .health(memberCert.isHealth())
                .healthInfo(memberCert.getHealthInfo())
                .estate(memberCert.isEstate())
                .estateAmount(memberCert.getEstateAmount())
                .income(memberCert.isIncome())
                .incomeAmount(memberCert.getIncomeAmount())
                .build();
            return memberCertDto;
        } catch (Exception e) {
            throw new MemberRuntimeException(MemberExceptionCode.MEMBER_INFO_NOT_EXISTS);
        }
    }

    /**
     * 다른 유저 데이터 가져오기
     * @param memberId
     * @return
     */
    public MemberCertDto getMemberCertificate(Long memberId) {
        Member member = memberRepository.findById(memberId)
            .orElseThrow(() -> new MemberRuntimeException(MemberExceptionCode.MEMBER_NOT_EXISTS));

        MemberCert memberCert = memberCertRepository.findByMember(member)
            .orElseThrow(
                () -> new MemberRuntimeException(MemberExceptionCode.MEMBER_INFO_NOT_EXISTS));

        try {
            MemberCertDto memberCertDto = MemberCertDto.builder()
                .university(memberCert.isUniversity())
                .universityName(memberCert.getUniversityName())
                .job(memberCert.isJob())
                .jobNames(memberCert.getJobNames())
                .certificate(memberCert.isCertificate())
                .certificateNames(memberCert.getCertificateNames())
                .health(memberCert.isHealth())
                .healthInfo(memberCert.getHealthInfo())
                .estate(memberCert.isEstate())
                .estateAmount(memberCert.getEstateAmount())
                .income(memberCert.isIncome())
                .incomeAmount(memberCert.getIncomeAmount())
                .build();
            return memberCertDto;
        } catch (Exception e) {
            throw new MemberRuntimeException(MemberExceptionCode.MEMBER_INFO_NOT_EXISTS);
        }
    }

    /**
     * 멤버 인증 정보 수정
     *
     * @param currentMemberDidAddress 현재 로그인 회원
     * @param memberCertDto           유저 수정 인증 정보
     */
    public void putMemberCertificate(String currentMemberDidAddress, MemberCertDto memberCertDto) {
        Member member = memberRepository.findByDidAddress(currentMemberDidAddress)
            .orElseThrow(() -> new MemberRuntimeException(MemberExceptionCode.MEMBER_NOT_EXISTS));

        MemberCert memberCert = memberCertRepository.findByMember(member)
            .orElseThrow(
                () -> new MemberRuntimeException(MemberExceptionCode.MEMBER_INFO_NOT_EXISTS));

        try {
            memberCert.setUniversity(memberCert.isUniversity());
            memberCert.setJob(memberCert.isJob());
            memberCert.setCertificate(memberCert.isCertificate());
            memberCert.setHealth(memberCert.isHealth());
            memberCert.setEstate(memberCert.isEstate());
            memberCert.setIncome(memberCert.isIncome());
            memberCertRepository.save(memberCert);
        } catch (Exception e) {
            throw new MemberRuntimeException(MemberExceptionCode.MEMBER_INPUT_TYPE_WRONG);
        }

    }

    /**
     * 유저 관심사 정보 리스트 가져오기
     *
     * @param memberId 멤버 아이디
     * @return
     */
    public GetInterestListResponseDto getMemberInterestList(Long memberId) {
        Member member = memberRepository.findById(memberId)
            .orElseThrow(() -> new MemberRuntimeException(MemberExceptionCode.MEMBER_NOT_EXISTS));

        try {
            List<InterestList> interestList = interestListRepository.findAllByMember(member);
            List<InterestDto> interestDtos = new ArrayList<>();
            interestList.forEach((interest) -> {
                interestDtos.add(
                    InterestDto.builder()
                        .interestListId(interest.getId())
                        .name(interest.getInterest().getName())
                        .build()
                );
            });

            GetInterestListResponseDto getInterestListResponseDto = GetInterestListResponseDto.builder()
                .interestList(interestDtos).build();
            return getInterestListResponseDto;
        } catch (Exception e) {
            throw new MemberRuntimeException(MemberExceptionCode.MEMBER_INFO_NOT_EXISTS);
        }
    }

    /**
     * 현재 유저 관심사 정보 리스트 가져오기
     *
     * @param currentMemberDidAddress 멤버 주소 정보
     * @return
     */
    public GetInterestListResponseDto getMyInterestList(String currentMemberDidAddress) {
        Member member = memberRepository.findByDidAddress(currentMemberDidAddress)
                .orElseThrow(() -> new MemberRuntimeException(MemberExceptionCode.MEMBER_NOT_EXISTS));

        try {
            List<InterestList> interestList = interestListRepository.findAllByMember(member);
            List<InterestDto> interestDtos = new ArrayList<>();
            interestList.forEach((interest) -> {
                interestDtos.add(
                        InterestDto.builder()
                                .interestListId(interest.getId())
                                .name(interest.getInterest().getName())
                                .build()
                );
            });

            GetInterestListResponseDto getInterestListResponseDto = GetInterestListResponseDto.builder()
                    .interestList(interestDtos).build();
            return getInterestListResponseDto;
        } catch (Exception e) {
            throw new MemberRuntimeException(MemberExceptionCode.MEMBER_INFO_NOT_EXISTS);
        }
    }

    /**
     * 관심사 정보 삭제
     *
     * @param interestListId 관심사 리스트 아이디
     */
    public void deleteInterest(Long interestListId) {

        try {
            InterestList interestList = interestListRepository.findById(interestListId)
                .orElseThrow(
                    () -> new MemberRuntimeException(MemberExceptionCode.MEMBER_INFO_NOT_EXISTS));

            interestListRepository.delete(interestList);
        } catch (Exception e) {
            throw new MemberRuntimeException(MemberExceptionCode.MEMBER_INTEREST_DELETE_FAILED);
        }
    }

    /**
     * 유저 관심사 새 등록
     *
     * @param currentMemberDidAddress 현재 로그인한 유저
     * @param name                    관심사 이름
     * @return
     */
    public InterestDto addInterest(String currentMemberDidAddress, String name) {
        // 먼저 현재 유저를 찾는다
        Member member = memberRepository.findByDidAddress(currentMemberDidAddress)
            .orElseThrow(() -> new MemberRuntimeException(MemberExceptionCode.MEMBER_NOT_EXISTS));

        try {
            // 현재등록된 관심사 리스트를 검색한다
            List<InterestList> interestLists = interestListRepository.findAllByMember(member);
            // 6개가 찼다면 더이상 등록 불가
            if (interestLists.size() == 6) {
                throw new MemberRuntimeException(MemberExceptionCode.MEMBER_INPUT_MAX_EXCEED);
            }

            // 존재하지 않은 관심사면 새로 만들어준다
            if (!interestRepository.existsByName(name)) {
                Interest interest = Interest.builder()
                    .name(name).build();
                interestRepository.save(interest);
            }

            // 새 관심사 리스트를 생성하고 저장해준다
            Interest tempInterest = interestRepository.findByName(name)
                .orElseThrow(
                    () -> new MemberRuntimeException(MemberExceptionCode.MEMBER_INFO_NOT_EXISTS));

            InterestList interestList = InterestList.builder()
                .interest(tempInterest)
                .member(member)
                .build();

            interestListRepository.save(interestList);

            // 방금 저장한 관심사 리스트를 불러와서, 아이디값을 알아낸다. 이 값을 바탕으로 DTO를 생성해서 반환한다.
            InterestList uploadedInterestList = interestListRepository.findByMemberAndInterest(
                    member, tempInterest)
                .orElseThrow(
                    () -> new MemberRuntimeException(MemberExceptionCode.MEMBER_INFO_NOT_EXISTS));

            InterestDto interestDto = InterestDto.builder()
                .interestListId(uploadedInterestList.getId())
                .name(name)
                .build();
            return interestDto;
        } catch (Exception e) {
            throw new MemberRuntimeException(MemberExceptionCode.MEMBER_INFO_NOT_EXISTS);
        }
    }

    /**
     * 좋아요 한 멤버들 가져오기
     *
     * @param currentMemberDidAddress
     * @return
     */
    public GetLikedMembersResponseDto getLikedMembers(String currentMemberDidAddress) {

        Member member = memberRepository.findByDidAddress(currentMemberDidAddress)
            .orElseThrow(() -> new MemberRuntimeException(MemberExceptionCode.MEMBER_NOT_EXISTS));

        List<Member> likedMembers = memberRepository.getMembersByFavoredInfo(member.getId());

        try {
            List<LikedMemberDto> list = new ArrayList<>();

            likedMembers.forEach((likedmember) -> {
                LikedMemberDto likedMemberDto = LikedMemberDto.builder()
                    .memberId(likedmember.getId())
                    .nickname(likedmember.getNickname())
                    .age(likedmember.getAge())
                    .imageMain(memberImgRepository.findFirstByMember(likedmember).getImageContent())
                    .build();
                list.add(likedMemberDto);
            });

            return new GetLikedMembersResponseDto(list);

        } catch (Exception e) {
            throw new MemberRuntimeException(MemberExceptionCode.MEMBER_INFO_NOT_EXISTS);
        }
    }

    /**
     * 유저 인증 정보 초기 세팅
     *
     * @param holderDid
     */
    public void addMemberCert(String holderDid) {
        Member member = memberRepository.findByDidAddress(holderDid)
            .orElseThrow(() -> new MemberRuntimeException(MemberExceptionCode.MEMBER_NOT_EXISTS));

        try {
            MemberCert memberCert = MemberCert.builder()
                .member(member).build();
            memberCertRepository.save(memberCert);
        } catch (Exception e) {
            throw new MemberRuntimeException(MemberExceptionCode.MEMBER_NOT_EXISTS);
        }


    }

    /**
     * 유저 정보 초기 세팅
     *
     * @param holderDid
     */
    public void addNewInfo(String holderDid) {
        Member member = memberRepository.findByDidAddress(holderDid)
            .orElseThrow(() -> new MemberRuntimeException(MemberExceptionCode.MEMBER_NOT_EXISTS));

        try {
            MyInfo myInfo = MyInfo.builder()
                .member(member)
                .build();
            myInfoRepository.save(myInfo);
        } catch (Exception e) {
            throw new MemberRuntimeException(MemberExceptionCode.MEMBER_INFO_NOT_EXISTS);
        }
    }

    /**
     * 유저 초기 필터링 정보 세팅
     *
     * @param holderDid
     */
    public void addNewFiltering(String holderDid) {
        Member member = memberRepository.findByDidAddress(holderDid)
            .orElseThrow(() -> new MemberRuntimeException(MemberExceptionCode.MEMBER_NOT_EXISTS));
        try {
            Filtering filtering = Filtering.builder()
                .member(member)
                .build();
            filteringRepository.save(filtering);
        } catch (Exception e) {
            throw new MemberRuntimeException(MemberExceptionCode.MEMBER_INFO_NOT_EXISTS);
        }

    }


    public GetMemberCertResponseDto getMemberCert(Long memberId) {
        Member member = memberRepository.findById(memberId).orElseThrow(() -> {
            throw new CustomException(ErrorCode.MEMBER_NOT_FOUND);
        });
        MemberCert memberCert = memberCertRepository.findByMember(member)
            .orElse(new MemberCert());
        return GetMemberCertResponseDto.builder()
            .university(memberCert.getUniversityName() == null ?
                null : memberCert.getUniversityName())
            .job(memberCert.getJobNames() == null ?
                null : memberCert.getJobNames())
            .certificate(memberCert.getCertificateNames() == null ?
                null : memberCert.getCertificateNames())
            .estate(memberCert.getEstateAmount() == null ?
                null : Long.valueOf(memberCert.getEstateAmount()))
            .health(memberCert.getHealthInfo() == null ?
                null : memberCert.getHealthInfo())
            .income(memberCert.getIncomeAmount() == null ?
                null : Long.valueOf(memberCert.getIncomeAmount()))
            .build();

    }


}
