package com.omm.jwt;

import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.security.config.annotation.SecurityConfigurerAdapter;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.DefaultSecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@RequiredArgsConstructor
public class JwtSecurityConfig extends
    SecurityConfigurerAdapter<DefaultSecurityFilterChain, HttpSecurity> {

    private final TokenProvider tokenProvider;
    private final RedisTemplate redisTemplate;

    /**
     * JwtFilter를 등록한다.
     * @param http
     */
    @Override
    public void configure(HttpSecurity http) {
        http.addFilterBefore(
            new JwtFilter(tokenProvider, redisTemplate),
            UsernamePasswordAuthenticationFilter.class
        );
    }

}
