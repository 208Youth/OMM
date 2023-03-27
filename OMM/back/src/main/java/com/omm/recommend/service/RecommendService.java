package com.omm.recommend.service;

import com.omm.exception.member.MemberExceptionCode;
import com.omm.exception.member.MemberRuntimeException;
import com.omm.model.entity.Filtering;
import com.omm.model.entity.Member;
import com.omm.recommend.model.dto.KNNDto;
import com.omm.recommend.model.response.GetRecommendListResponseDto;
import com.omm.repository.FilteringRepository;
import com.omm.repository.MemberRepository;
import com.omm.repository.MyInfoRepository;
import com.omm.util.EnumToKNN;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class RecommendService {

    private final MemberRepository memberRepository;

    private final MyInfoRepository myInfoRepository;

    private final FilteringRepository filteringRepository;

    public List<GetRecommendListResponseDto> getRecommendList(String currentUserNickname) {

        try{
            Member member = memberRepository.findByNickname(currentUserNickname)
                    .orElseThrow(() -> new MemberRuntimeException(MemberExceptionCode.MEMBER_NOT_EXISTS));

            Filtering myFilter = filteringRepository.findByMember(member)
                    .orElseThrow(() -> new MemberRuntimeException(MemberExceptionCode.MEMBER_FILTERING_NOT_EXISTS));

            // 현재 멤버 가상 페르소나 설정
            KNNDto persona = KNNDto.builder()
                    .age((myFilter.getAgeMax()*1.0F - myFilter.getAgeMin())/2)
                    .height((myFilter.getHeightMax()*1.0F - myFilter.getHeightMin())/2)
                    .distance(0.0F)
                    .contactStyle(EnumToKNN.filterContactToKNN(myFilter.getContactStyle()))
                    .drinkingStyle(EnumToKNN.filterDrinkingToKNN(myFilter.getDrinkingStyle()))
                    .smokingStyle(EnumToKNN.filterSmokingToKNN(myFilter.getSmokingStyle()))
                    .build();

            // 유저가 지정한 필터링 조건에 맞는 사람 1차적 선별
            // 좋아요, 싫어요 보낸 유저 제외

            // 이 목록이 없

            // FastAPI 에 보낼 자료구조 생성

            // 가상 페르소나
        } catch(Exception e){
            throw new MemberRuntimeException(MemberExceptionCode.MEMBER_INPUT_TYPE_WRONG);
        }
        return null;
    }
}
