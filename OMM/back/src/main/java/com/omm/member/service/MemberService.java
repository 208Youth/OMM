package com.omm.member.service;

import com.omm.exception.member.MemberExceptionCode;
import com.omm.exception.member.MemberRuntimeException;
import com.omm.member.model.dto.InterestDto;
import com.omm.member.model.dto.LikedMemberDto;
import com.omm.member.model.dto.MemberCertDto;
import com.omm.member.model.dto.RegistDto;
import com.omm.member.model.request.*;
import com.omm.member.model.response.GetInterestListResponseDto;
import com.omm.member.model.response.GetLikedMembersResponseDto;
import com.omm.member.model.response.GetMemberFilteringResponseDto;
import com.omm.member.model.response.GetMemberInfoResponseDto;
import com.omm.model.entity.*;
import com.omm.model.entity.enums.*;
import com.omm.repository.*;
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

    private final MemberCertRepository memberCertRepository;

    private final InterestRepository interestRepository;

    private final InterestListRepository interestListRepository;

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
                    .build();
            System.out.println(member.toString());
            memberRepository.save(member);
            System.out.println(member.toString());
        } catch(Exception e){
            throw new MemberRuntimeException(MemberExceptionCode.MEMBER_INPUT_TYPE_WRONG);
        }

    }

//    public void createMember(String memberNickname) {
//        try {
//            Member member = Member.builder()
//                    .nickname(memberNickname)
////                    .isBlack(false)
////                    .grade("role_user")
//                    .build();
//            memberRepository.save(member);
//        } catch (Exception e) {
//            throw new MemberRuntimeException(MemberExceptionCode.MEMBER_INPUT_TYPE_WRONG);
//        }
//    }

    /**
     * 초기 회원 정보 설정 함수
     *
     * @param currentMemberDidAddress
     * @param initMemberInfoRequestDto 초기 회원 정보
     */
    public void initMemberInfo(String currentMemberDidAddress, InitMemberInfoRequestDto initMemberInfoRequestDto) {


        Member member = memberRepository.findByDidAddress(currentMemberDidAddress)
                .orElseThrow(() -> new MemberRuntimeException(MemberExceptionCode.MEMBER_NOT_EXISTS));

        try {
            MyInfo myInfo = MyInfo.builder()
                    .member(member)
                    .lat(initMemberInfoRequestDto.getLat())
                    .lng(initMemberInfoRequestDto.getLng())
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
     * @param currentMemberDidAddress         현재 유저 did 주소
     * @param initMemberFilteringRequestDto 등록 정보
     */
    public void initMemberFiltering(String currentMemberDidAddress, InitMemberFilteringRequestDto initMemberFilteringRequestDto) {

        Member member = memberRepository.findByDidAddress(currentMemberDidAddress)
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
     *
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
     *
     * @param currentMemberDidAddress 현재 멤버 did주소
     * @return
     */
    public GetMemberFilteringResponseDto getMemberFiltering(String currentMemberDidAddress) {
        Member member = memberRepository.findByDidAddress(currentMemberDidAddress)
                .orElseThrow(() -> new MemberRuntimeException(MemberExceptionCode.MEMBER_NOT_EXISTS));

        Filtering filtering = filteringRepository.findByMember(member)
                .orElseThrow(() -> new MemberRuntimeException(MemberExceptionCode.MEMBER_FILTERING_NOT_EXISTS));

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
     * 유저 이미지 업로드 함수
     *
     * @param currentMemberDidAddress 현재 로그인 유저 did 주소
     * @param uploadImageRequestDto 업로드 폼
     */
    public void postMemberImages(String currentMemberDidAddress, UploadImageRequestDto uploadImageRequestDto) {
        Member member = memberRepository.findByDidAddress(currentMemberDidAddress)
                .orElseThrow(() -> new MemberRuntimeException(MemberExceptionCode.MEMBER_NOT_EXISTS));

        try {
            List<Blob> images = uploadImageRequestDto.getImages();

            images.forEach((image) -> {
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
     * 이미지 교체 방식
     *
     * @param currentMemberDidAddress 현재 로그인 유저
     * @param uploadImageRequestDto 이미지 교체 요청 정보
     */
    public void putMemberImages(String currentMemberDidAddress, UploadImageRequestDto uploadImageRequestDto) {
        Member member = memberRepository.findByDidAddress(currentMemberDidAddress)
                .orElseThrow(() -> new MemberRuntimeException(MemberExceptionCode.MEMBER_NOT_EXISTS));

        try {
            List<MemberImg> memberImages = memberImgRepository.findAllById(member.getId());

            memberImgRepository.deleteAll(memberImages);
        } catch (Exception e) {
            throw new MemberRuntimeException(MemberExceptionCode.MEMBER_IMAGE_DELETE_FAILED);
        }

        try {
            List<Blob> images = uploadImageRequestDto.getImages();

            images.forEach((image) -> {
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
     * @param currentMemberDidAddress   현재 로그인 유저
     * @param putMemberInfoRequestDto 수정 유저 정보 객체
     */
    public void putMemberInfo(String currentMemberDidAddress, PutMemberInfoRequestDto putMemberInfoRequestDto) {
        Member member = memberRepository.findByDidAddress(currentMemberDidAddress)
                .orElseThrow(() -> new MemberRuntimeException(MemberExceptionCode.MEMBER_NOT_EXISTS));

        MyInfo myInfo = myInfoRepository.findByMember(member)
                .orElseThrow(() -> new MemberRuntimeException(MemberExceptionCode.MEMBER_INFO_NOT_EXISTS));

        try {
            myInfo.setHeight(putMemberInfoRequestDto.getHeight());
            myInfo.setContactStyle(InfoContactStyle.valueOf(putMemberInfoRequestDto.getContactStyle()));
            myInfo.setDrinkingStyle(InfoDrinkingStyle.valueOf(putMemberInfoRequestDto.getDrinkingStyle()));
            myInfo.setSmokingStyle(InfoSmokingStyle.valueOf(putMemberInfoRequestDto.getSmokingStyle()));
            myInfo.setMilitary(InfoMilitary.valueOf(putMemberInfoRequestDto.getMilitary()));
            myInfo.setPet(InfoPet.valueOf(putMemberInfoRequestDto.getPet()));
            myInfo.setMbti(InfoMBTI.valueOf(putMemberInfoRequestDto.getMbti()));

            myInfoRepository.save(myInfo);

        } catch (Exception e) {
            throw new MemberRuntimeException(MemberExceptionCode.MEMBER_INPUT_TYPE_WRONG);
        }

    }

    /**
     * 멤버 필터링 정보 수정
     *
     * @param currentMemberDidAddress        현재 로그인 유저
     * @param putMemberFilteringRequestDto 필터링 정보 객체
     */
    public void putMemberFiltering(String currentMemberDidAddress, PutMemberFilteringRequestDto putMemberFilteringRequestDto) {
        Member member = memberRepository.findByDidAddress(currentMemberDidAddress)
                .orElseThrow(() -> new MemberRuntimeException(MemberExceptionCode.MEMBER_NOT_EXISTS));

        Filtering filtering = filteringRepository.findByMember(member)
                .orElseThrow(() -> new MemberRuntimeException(MemberExceptionCode.MEMBER_FILTERING_NOT_EXISTS));

        try {
            filtering.setAgeMin(putMemberFilteringRequestDto.getAgeMin());
            filtering.setAgeMax(putMemberFilteringRequestDto.getAgeMax());
            filtering.setHeightMin(putMemberFilteringRequestDto.getHeightMin());
            filtering.setHeightMax(putMemberFilteringRequestDto.getHeightMax());
            filtering.setRangeMin(putMemberFilteringRequestDto.getRangeMin());
            filtering.setRangeMax(putMemberFilteringRequestDto.getRangeMax());
            filtering.setContactStyle(FilterContactStyle.valueOf(putMemberFilteringRequestDto.getContactStyle()));
            filtering.setDrinkingStyle(FilterDrinkingStyle.valueOf(putMemberFilteringRequestDto.getDrinkingStyle()));
            filtering.setSmokingStyle(FilterSmokingStyle.valueOf(putMemberFilteringRequestDto.getSmokingStyle()));

            filteringRepository.save(filtering);
        } catch (Exception e) {
            throw new MemberRuntimeException(MemberExceptionCode.MEMBER_INPUT_TYPE_WRONG);
        }

    }

    /**
     * 유저 위치 정보 수정
     *
     * @param currentMemberDidAddress       현재 로그인 유저
     * @param putMemberLocationRequestDto 요청 유저 수정 위치 정보
     */
    public void putMemberLocation(String currentMemberDidAddress, PutMemberLocationRequestDto putMemberLocationRequestDto) {
        Member member = memberRepository.findByDidAddress(currentMemberDidAddress)
                .orElseThrow(() -> new MemberRuntimeException(MemberExceptionCode.MEMBER_NOT_EXISTS));

        MyInfo myInfo = myInfoRepository.findByMember(member)
                .orElseThrow(() -> new MemberRuntimeException(MemberExceptionCode.MEMBER_INFO_NOT_EXISTS));

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
     * @param putMemberPrRequestDto 수정 자기소개 정보
     */
    public void putMemberPr(String currentMemberDidAddress, PutMemberPrRequestDto putMemberPrRequestDto) {
        Member member = memberRepository.findByDidAddress(currentMemberDidAddress)
                .orElseThrow(() -> new MemberRuntimeException(MemberExceptionCode.MEMBER_NOT_EXISTS));

        MyInfo myInfo = myInfoRepository.findByMember(member)
                .orElseThrow(() -> new MemberRuntimeException(MemberExceptionCode.MEMBER_INFO_NOT_EXISTS));

        try {
            myInfo.setPr(putMemberPrRequestDto.getPr());
            myInfoRepository.save(myInfo);
        } catch (Exception e) {
            throw new MemberRuntimeException(MemberExceptionCode.MEMBER_INPUT_TYPE_WRONG);
        }
    }

    /**
     * 유저 인증정보 가져오기
     *
     * @param currentMemberDidAddress 현재 로그인 유저
     * @return
     */
    public MemberCertDto getMemberCertificate(String currentMemberDidAddress) {
        Member member = memberRepository.findByDidAddress(currentMemberDidAddress)
                .orElseThrow(() -> new MemberRuntimeException(MemberExceptionCode.MEMBER_NOT_EXISTS));

        MemberCert memberCert = memberCertRepository.findByMember(member)
                .orElseThrow(() -> new MemberRuntimeException(MemberExceptionCode.MEMBER_INFO_NOT_EXISTS));

        try {
            MemberCertDto memberCertDto = MemberCertDto.builder()
                    .university(memberCert.isUniversity())
                    .job(memberCert.isJob())
                    .certificate(memberCert.isCertificate())
                    .health(memberCert.isHealth())
                    .estate(memberCert.isEstate())
                    .income(memberCert.isIncome())
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
     * @param memberCertDto         유저 수정 인증 정보
     */
    public void putMemberCertificate(String currentMemberDidAddress, MemberCertDto memberCertDto) {
        Member member = memberRepository.findByDidAddress(currentMemberDidAddress)
                .orElseThrow(() -> new MemberRuntimeException(MemberExceptionCode.MEMBER_NOT_EXISTS));

        MemberCert memberCert = memberCertRepository.findByMember(member)
                .orElseThrow(() -> new MemberRuntimeException(MemberExceptionCode.MEMBER_INFO_NOT_EXISTS));

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
     * 관심사 정보 삭제
     *
     * @param interestListId 관심사 리스트 아이디
     */
    public void deleteInterest(Long interestListId) {

        try {
            InterestList interestList = interestListRepository.findById(interestListId)
                    .orElseThrow(() -> new MemberRuntimeException(MemberExceptionCode.MEMBER_INFO_NOT_EXISTS));

            interestListRepository.delete(interestList);
        } catch (Exception e) {
            throw new MemberRuntimeException(MemberExceptionCode.MEMBER_INTEREST_DELETE_FAILED);
        }
    }

    /**
     * 유저 관심사 새 등록
     *
     * @param currentMemberDidAddress 현재 로그인한 유저
     * @param name                  관심사 이름
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
            if (interestLists.size() == 6)
                throw new MemberRuntimeException(MemberExceptionCode.MEMBER_INPUT_MAX_EXCEED);

            // 존재하지 않은 관심사면 새로 만들어준다
            if (!interestRepository.existsByName(name)) {
                Interest interest = Interest.builder()
                        .name(name).build();
                interestRepository.save(interest);
            }

            // 새 관심사 리스트를 생성하고 저장해준다
            Interest tempInterest = interestRepository.findByName(name)
                    .orElseThrow(() -> new MemberRuntimeException(MemberExceptionCode.MEMBER_INFO_NOT_EXISTS));

            InterestList interestList = InterestList.builder()
                    .interest(tempInterest)
                    .member(member)
                    .build();

            interestListRepository.save(interestList);

            // 방금 저장한 관심사 리스트를 불러와서, 아이디값을 알아낸다. 이 값을 바탕으로 DTO를 생성해서 반환한다.
            InterestList uploadedInterestList = interestListRepository.findByMemberAndInterest(member, tempInterest)
                    .orElseThrow(() -> new MemberRuntimeException(MemberExceptionCode.MEMBER_INFO_NOT_EXISTS));

            InterestDto interestDto = InterestDto.builder()
                    .interestListId(uploadedInterestList.getId())
                    .name(name)
                    .build();
            return interestDto;
        } catch (Exception e) {
            throw new MemberRuntimeException(MemberExceptionCode.MEMBER_INFO_NOT_EXISTS);
        }
    }


    public GetLikedMembersResponseDto getLikedMembers(String currentMemberDidAddress) {

//        Member member = memberRepository.findByDidAddress(currentMemberDidAddress)
//                .orElseThrow(() -> new MemberRuntimeException(MemberExceptionCode.MEMBER_NOT_EXISTS));
//
//        MemberImg memberImg = memberImgRepository.findFirstByMember(member);
//
//        try {
//            LikedMemberDto likedMemberDto = LikedMemberDto.builder()
//                    .memberId(member.getId())
//                    .imageMain(memberImg.getImageContent())
//                    .nickname(member.getNickname())
//                    .age(member.getAge())
//                    .build();
//
//        } catch (Exception e) {
//
//        }

        return null;
    }
}
