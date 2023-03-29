package com.omm.recommend.service;

import com.omm.exception.member.MemberExceptionCode;
import com.omm.exception.member.MemberRuntimeException;
import com.omm.model.entity.Filtering;
import com.omm.model.entity.Member;
import com.omm.model.entity.MyInfo;
import com.omm.model.entity.RecommendDto;
import com.omm.recommend.model.response.GetRecommendListResponseDto;
import com.omm.repository.FilteringRepository;
import com.omm.repository.MemberRepository;
import com.omm.repository.MyInfoRepository;
import com.omm.repository.RecommendDtoRepository;
import com.omm.util.EnumToKNN;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class RecommendService {

    private final MemberRepository memberRepository;

    private final MyInfoRepository myInfoRepository;

    private final FilteringRepository filteringRepository;

    private final RecommendDtoRepository recommendDtoRepository;

    public List<GetRecommendListResponseDto> getRecommendList(String currentMemberDidAddress) {


        try {
            Member member = memberRepository.findByDidAddress(currentMemberDidAddress)
                    .orElseThrow(() -> new MemberRuntimeException(MemberExceptionCode.MEMBER_NOT_EXISTS));

            MyInfo myInfo = myInfoRepository.findByMember(member)
                    .orElseThrow(() -> new MemberRuntimeException(MemberExceptionCode.MEMBER_NOT_EXISTS));

            Filtering myFilter = filteringRepository.findByMember(member)
                    .orElseThrow(() -> new MemberRuntimeException(MemberExceptionCode.MEMBER_FILTERING_NOT_EXISTS));

            // 유저가 지정한 필터링 조건에 맞는 사람 1차적 선별
            // 좋아요, 싫어요 보낸 유저 제외
            List<RecommendDto> filteredList = recommendDtoRepository.filteredMembers3(myInfo);

            System.out.println(filteredList.size());
            // 이 목록이 없을 경우, 필터링 상관 없이 좋아요나 싫어요를 보내지 않은 상대 최대 200개 선별
            if (filteredList.isEmpty()) {
                filteredList = recommendDtoRepository.filteredMembers2(myInfo);
            }

            // 그래도 없다면, 그냥 유저를 최대 200개까지 전송
            if (filteredList.isEmpty()) {
                filteredList = recommendDtoRepository.filteredMembers3(myInfo);
            }

             //FastAPI 에 보낼 자료구조 생성
            Map<String, Double> myKNN = new HashMap<>();
            myKNN.put("age", (myFilter.getAgeMax() * 1.0 + myFilter.getAgeMin()) / 2);
            myKNN.put("height", (myFilter.getHeightMax() * 1.0 + myFilter.getHeightMin()) / 2);
            myKNN.put("distance", 0.0);
            myKNN.put("contactStyle", EnumToKNN.filterContactToKNN(myFilter.getContactStyle()));
            myKNN.put("drinkingStyle", EnumToKNN.filterDrinkingToKNN(myFilter.getDrinkingStyle()));
            myKNN.put("smokingStyle", EnumToKNN.filterSmokingToKNN(myFilter.getSmokingStyle()));

            System.out.print("Mydata | ");
            for ( String key : myKNN.keySet() ) {
                System.out.print(key + " : " + myKNN.get(key) + " | ");
            }
            System.out.println();

            Map<Long, Map<String, Double>> users = new HashMap<>();
            filteredList.forEach((filtMem)->{
                Map<String, Double> user = new HashMap<>();
                user.put("age", (double) filtMem.getAge());
                user.put("height", (double) filtMem.getHeight());
                user.put("distance", filtMem.getDistance());
                user.put("contactStyle", EnumToKNN.infoContactToKNN(filtMem.getContactStyle()));
                user.put("drinkingStyle", EnumToKNN.infoDrinkingToKNN(filtMem.getDrinkingStyle()));
                user.put("smokingStyle", EnumToKNN.infoSmokingToKNN(filtMem.getSmokingStyle()));

                System.out.print("user | ");
                for ( String key : user.keySet() ) {
                    System.out.print(key + " : " + user.get(key) + " | ");
                }
                System.out.println();

                users.put(filtMem.getMemberId(),user);

            });

            Map<String, Object> requestBody = new HashMap<>();
            requestBody.put("myinfo", myKNN);
            requestBody.put("users", users);

//            // FastAPI로 전송
//            String url = "http://localhost:8000/recommend"; // fastAPI url
//            RestTemplate restTemplate = new RestTemplate();
//            HttpHeaders headers = new HttpHeaders();
//            headers.setContentType(MediaType.APPLICATION_JSON);
//            ObjectMapper mapper = new ObjectMapper();
//
//            HttpEntity<String> request = new HttpEntity<>(mapper.writeValueAsString(requestBody), headers);
//            ResponseEntity<String> response = restTemplate.postForEntity(url, request, String.class);
//            String responseBody = response.getBody();
//            System.out.println(responseBody);


        } catch (Exception e) {
            throw new MemberRuntimeException(MemberExceptionCode.MEMBER_INPUT_TYPE_WRONG);
        }
        return null;
    }
}
