package com.omm.member.service;

import com.omm.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MemberService {
    private final MemberRepository memberRepository;

    /**
     * 닉네임 중복 체크 함수
     * @param nickname 닉네임
     * @return
     */
    public boolean existNickname(String nickname) {
        return memberRepository.existsByNickname(nickname);
    }
}
