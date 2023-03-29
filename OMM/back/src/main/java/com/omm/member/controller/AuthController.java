package com.omm.member.controller;

import com.omm.jwt.JwtFilter;
import com.omm.jwt.TokenProvider;
import com.omm.member.model.dto.AdminLoginDto;
import com.omm.member.model.dto.AuthDto;
import com.omm.member.model.dto.TokenDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping
@RequiredArgsConstructor
public class AuthController {
    private final TokenProvider tokenProvider;
    private final AuthenticationManagerBuilder authenticationManagerBuilder;

    /**
     * 일반 유저 로그인
     * @param authDto
     * @return
     */
    @PostMapping("/authenticate")
    public ResponseEntity<TokenDto> authorize(@RequestBody AuthDto authDto) {
        return authenticate(authDto.getHolderDid(), authDto.getVpJwt());
    }

    /**
     * 관리자 유저 로그인
     * @param loginDto
     * @return
     */
    @PostMapping("/authenticate/admin")
    public ResponseEntity<TokenDto> authorizeAdmin(@RequestBody AdminLoginDto loginDto) {
        return authenticate(loginDto.getUsername(), loginDto.getPassword());
    }

    /**
     * 로그인 과정에서 중복되는 작업
     *
     * @param username
     * @param password
     * @return
     */
    private ResponseEntity<TokenDto> authenticate(String username, String password) {

        UsernamePasswordAuthenticationToken authenticationToken =
            new UsernamePasswordAuthenticationToken(username, password);

        Authentication authentication = authenticationManagerBuilder.getObject().authenticate(authenticationToken);

        String jwt = tokenProvider.createToken(authentication);

        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.add(JwtFilter.AUTHORIZATION_HEADER, "Bearer " + jwt);

        return new ResponseEntity<>(new TokenDto(jwt), httpHeaders, HttpStatus.OK);
    }

}
