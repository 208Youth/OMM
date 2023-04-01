package com.omm.member.service;

import com.omm.exception.CustomException;
import com.omm.model.entity.Admin;
import com.omm.repository.AdminRepository;
import com.omm.util.error.ErrorCode;
import java.util.Collections;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

/**
 * 관리자 유저를 위한 UserDetailService
 */
@Component("adminDetailsService")
@RequiredArgsConstructor
public class CustomAdminDetailsService implements UserDetailsService {

    private final AdminRepository adminRepository;

    @Override
    @Transactional
    public UserDetails loadUserByUsername(final String username) throws UsernameNotFoundException {
        return adminRepository.findByUsername(username)
            .map(admin -> createUser(admin))
            .orElseThrow(() -> new CustomException(ErrorCode.MEMBER_NOT_FOUND));
    }

    private User createUser(Admin admin) {
        List<GrantedAuthority> grantedAuthorities = Collections.singletonList(
            new SimpleGrantedAuthority(admin.getAuthority().name()));

        return new User(admin.getUsername(), admin.getPassword(), grantedAuthorities);
    }

}
