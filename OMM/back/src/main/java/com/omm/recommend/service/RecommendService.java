package com.omm.recommend.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.gson.Gson;
import com.omm.exception.member.MemberExceptionCode;
import com.omm.exception.member.MemberRuntimeException;
import com.omm.model.entity.*;
import com.omm.recommend.model.request.SendFavorRequestDto;
import com.omm.recommend.model.response.GetRecommendListResponseDto;
import com.omm.recommend.model.response.GetRecommendedMemberDetailResponseDto;
import com.omm.repository.*;
import com.omm.util.EnumToKNN;
import com.omm.util.UrlInfo;
import lombok.RequiredArgsConstructor;
import lombok.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.sql.Blob;
import java.util.ArrayList;
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

    private final FavorRepository favorRepository;

    private final InterestListRepository interestListRepository;

    private final MemberImgRepository memberImgRepository;

    private final RestTemplate restTemplate;

//    private final UrlInfo urlInfo;

    public GetRecommendListResponseDto getRecommendList(String currentMemberDidAddress) {

        System.out.println(currentMemberDidAddress);
        try {
            Member member = memberRepository.findByDidAddress("did:ethr:goerli:0x03df8e54a30e3906d243d7402c59b82b5d854223ba3ae969ea23d2c12b8da49c5e")
                    .orElseThrow(() -> new MemberRuntimeException(MemberExceptionCode.MEMBER_NOT_EXISTS));

            MyInfo myInfo = myInfoRepository.findByMember(member)
                    .orElseThrow(() -> new MemberRuntimeException(MemberExceptionCode.MEMBER_NOT_EXISTS));

            Filtering myFilter = filteringRepository.findByMember(member)
                    .orElseThrow(() -> new MemberRuntimeException(MemberExceptionCode.MEMBER_FILTERING_NOT_EXISTS));

            // 유저가 지정한 필터링 조건에 맞는 사람 1차적 선별
            // 좋아요, 싫어요 보낸 유저 제외
            List<RecommendDto> filteredList = recommendDtoRepository.filteredMembers(myInfo, myFilter);

//            System.out.println(filteredList.size());
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
            filteredList.forEach((filtMem) -> {
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

                users.put(filtMem.getMemberId(), user);

            });

            Map<String, Object> requestBody = new HashMap<>();
            requestBody.put("myinfo", myKNN);
            requestBody.put("users", users);

            // FastAPI로 전송
            String url = "http://localhost:8000/recommend"; // fastAPI url

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            Gson gson = new Gson();

            HttpEntity<String> request = new HttpEntity<>(gson.toJson(requestBody), headers);
            ResponseEntity<GetRecommendListResponseDto> response = restTemplate.postForEntity(url, request, GetRecommendListResponseDto.class);
            GetRecommendListResponseDto responseBody = response.getBody();


            List<Long> idList = responseBody.getUserList();
            idList.forEach((num) -> System.out.print(num + " "));
            System.out.println(idList.get(0) + idList.get(1));

            return responseBody;

        } catch (Exception e) {
            throw new MemberRuntimeException(MemberExceptionCode.MEMBER_INPUT_TYPE_WRONG);
        }
    }

    public boolean sendFavor(String currentMemberDidAddress, SendFavorRequestDto sendFavorRequestDto) {
        Member member = memberRepository.findByDidAddress(currentMemberDidAddress)
                .orElseThrow(() -> new MemberRuntimeException(MemberExceptionCode.MEMBER_NOT_EXISTS));

        Member target = memberRepository.findById(sendFavorRequestDto.getSenderId())
                .orElseThrow(() -> new MemberRuntimeException(MemberExceptionCode.MEMBER_NOT_EXISTS));
        try {
            Favor favor = null;

            if(favorRepository.existsByFromMemberAndToMember(member, target)){
                favor = favorRepository.findByFromMemberAndToMember(member,target);
                favor.setValue(sendFavorRequestDto.isFavor());
            } else {
                favor = Favor.builder()
                        .fromMember(member)
                        .toMember(target)
                        .value(sendFavorRequestDto.isFavor())
                        .build();
            }
            favorRepository.save(favor);
            return sendFavorRequestDto.isFavor();

        } catch (Exception e) {
            throw new MemberRuntimeException(MemberExceptionCode.MEMBER_INFO_NOT_EXISTS);
        }

    }

    public GetRecommendedMemberDetailResponseDto getRecommendedMemberDetail(Long memberId) {

        Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new MemberRuntimeException(MemberExceptionCode.MEMBER_NOT_EXISTS));

        MyInfo myInfo = myInfoRepository.findByMember(member)
                .orElseThrow(() -> new MemberRuntimeException(MemberExceptionCode.MEMBER_NOT_EXISTS));

        List<MemberImg> memberImgList = memberImgRepository.findAllById(memberId);

        List<InterestList> interestList = interestListRepository.findAllByMember(member);

        try {
            List<Blob> images = new ArrayList<>();
            memberImgList.forEach((memberImg -> {
                images.add(memberImg.getImageContent());
            }));

            List<String> interests = new ArrayList<>();
            interestList.forEach((interest -> {
                interests.add(interest.getInterest().getName());
            }));

            GetRecommendedMemberDetailResponseDto getRecommendedMemberDetailResponseDto = GetRecommendedMemberDetailResponseDto.builder()
                    .memberId(member.getId())
                    .nickname(member.getNickname())
                    .pr(myInfo.getPr())
                    .age(member.getAge())
                    .imageList(images)
                    .interestList(interests)
                    .build();

            return getRecommendedMemberDetailResponseDto;
        } catch (Exception e) {
            throw new MemberRuntimeException(MemberExceptionCode.MEMBER_INFO_NOT_EXISTS);
        }

    }
}
