package com.omm.member.service;

import com.omm.exception.CustomException;
import com.omm.model.entity.Member;
import com.omm.repository.MemberRepository;
import com.omm.util.error.ErrorCode;
import java.util.Collections;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Component("userDetailsService")
public class CustomUserDetailsService implements UserDetailsService {

    private final MemberRepository memberRepository;

    public CustomUserDetailsService(MemberRepository memberRepository) {
        this.memberRepository = memberRepository;
    }

    @Override
    @Transactional
    public UserDetails loadUserByUsername(final String username) {
        return memberRepository.findByDidAddress(username)
            .map(member -> createUser(member))
            .orElseThrow(() -> new CustomException(ErrorCode.MEMBER_NOT_FOUND));
    }

    private User createUser(Member member) {
        if (member.isBlack()) {
            throw new CustomException(ErrorCode.BLACKLIST_MEMBER);
        }

        List<GrantedAuthority> grantedAuthorities = Collections.singletonList(
            new SimpleGrantedAuthority(member.getAuthority().getAuthorityName()));

        return new User(member.getDidAddress(), "", grantedAuthorities);
    }
}
