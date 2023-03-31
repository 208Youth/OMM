package com.omm.matching.repository;

import com.omm.exception.CustomException;
import com.omm.matching.model.entity.Notification;
import com.omm.model.entity.Member;
import com.omm.repository.MemberRepository;
import com.omm.util.error.ErrorCode;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.ListOperations;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Repository;

import javax.annotation.PostConstruct;
import java.util.List;

@Repository
@RequiredArgsConstructor
public class MatchingRepository {
    private final RedisTemplate redisTemplate;
    private ListOperations<String, Notification> opsListNotification;
    private final MemberRepository memberRepository;
    @PostConstruct
    private void init() {
        opsListNotification = redisTemplate.opsForList();
    }

    /**
     * receiver did address 조회
     * @param receiverId
     * @return
     */
    public String getReceiverAddr(Long receiverId) {
        Member member = memberRepository.findById(receiverId).orElseThrow(() -> {
            throw new CustomException(ErrorCode.MEMBER_NOT_FOUND);
        });
        return member.getDidAddress();
    }

    /**
     * 알림 생성
     * @param receiverId
     * @param notification
     */
    public void createNotification(Long receiverId, Notification notification) {
        opsListNotification.leftPush(String.valueOf(receiverId), notification);
    }

    /**
     * 알림 목록 조회
     * @param id
     * @return
     */
    public List<Notification> getNotifications(Long id) {
        return opsListNotification.range(String.valueOf(id), 0, -1);
    }

    /**
     * 알림 삭제
     * @param receiverId
     * @param notification
     */
    public void deleteNotification(Long receiverId, Notification notification) {
        opsListNotification.remove(String.valueOf(receiverId), 1, notification);
    }
}
