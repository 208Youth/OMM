package com.omm.member.service;

import com.omm.exception.member.MemberExceptionCode;
import com.omm.exception.member.MemberRuntimeException;
import com.omm.member.model.request.InitMemberInfoRequestDto;
import com.omm.member.repository.MemberRepository;
import com.omm.member.repository.MyInfoRepository;
import com.omm.model.entity.Member;
import com.omm.model.entity.MyInfo;
import com.omm.model.entity.enums.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MemberService {
    private final MemberRepository memberRepository;

    private final MyInfoRepository myInfoRepository;

    /**
     * 닉네임 중복 체크 함수
     *
     * @param nickname 닉네임
     * @return
     */
    public boolean existNickname(String nickname) {
        return memberRepository.existsByNickname(nickname);
    }

    /**
     * 초기 회원 정보 설정 함수
     * @param initMemberInfoRequestDto 초기 회원 정보
     */
    public void initMemberInfo(InitMemberInfoRequestDto initMemberInfoRequestDto) {
        // 초기 유저 설정이 닉네임 기준으로 찾아서 해야 하는데, 이 시점에 닉네임이 있는지 확인해야 함.
        Member member = memberRepository.findByNickname(initMemberInfoRequestDto.getNickname())
                .orElseThrow(() -> new MemberRuntimeException(MemberExceptionCode.MEMBER_NOT_EXISTS));

        try{
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
        }catch(Exception e){
            throw new MemberRuntimeException(MemberExceptionCode.MEMBER_INPUT_TYPE_WRONG);
        }
    }
}
