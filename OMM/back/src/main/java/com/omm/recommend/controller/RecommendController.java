package com.omm.recommend.controller;

import com.omm.recommend.model.request.SendFavorRequestDto;
import com.omm.recommend.service.RecommendService;
import com.omm.util.SecurityUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.websocket.server.PathParam;

@RestController
@RequestMapping("/recommend")
@RequiredArgsConstructor
public class RecommendController {

    private final RecommendService recommendService;

    /**
     * 좋아요 싫어요 여부 전송
     * @param sendFavorRequestDto 선호 정보
     * @return
     */
    @PostMapping
    public ResponseEntity<?> sendFavor(@RequestBody SendFavorRequestDto sendFavorRequestDto){
        boolean result = recommendService.sendFavor(SecurityUtil.getCurrentDidAddress().get(), sendFavorRequestDto);
        return new ResponseEntity<>( (result ? "좋아요" : "싫어요") + " 전송 완료",HttpStatus.OK);
    }

    /**
     * 현재 유저의 추천 목록을 불러온다.
     * @return
     */
    @GetMapping
    public ResponseEntity<?> getRecommendList(){
        // 현재 유저의 정보를 얻어온다
        return new ResponseEntity<>(recommendService.getRecommendList(SecurityUtil.getCurrentDidAddress().get()), HttpStatus.OK);
    }

    @GetMapping("/member/{member-id}")
    public ResponseEntity<?> getRecommendedMemberDetail(@PathVariable("member-id") Long memberId){
        return new ResponseEntity<>(recommendService.getRecommendedMemberDetail(memberId), HttpStatus.OK);
    }
}
