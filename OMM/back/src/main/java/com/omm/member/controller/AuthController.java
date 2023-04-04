package com.omm.member.controller;

import com.omm.jwt.JwtFilter;
import com.omm.jwt.TokenProvider;
import com.omm.member.model.dto.AdminLoginDto;
import com.omm.member.model.dto.AuthDto;
import com.omm.member.model.dto.TokenDto;
import com.omm.member.service.AuthService;
import javax.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
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
    private final AuthService authService;

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

        String jwt = authService.authenticate(username,password);

        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.add(JwtFilter.AUTHORIZATION_HEADER, "Bearer " + jwt);

        return new ResponseEntity<>(new TokenDto(jwt), httpHeaders, HttpStatus.OK);
    }

    @PostMapping("/signout")
    public ResponseEntity<String> logout(HttpServletRequest request) {

        String bearerToken = request.getHeader("Authorization");
        if (bearerToken != null && bearerToken.startsWith("Bearer ")) {
            bearerToken = bearerToken.substring(7);
        }
        authService.logout(bearerToken);

        return new ResponseEntity<>("로그아웃 성공", HttpStatus.OK);
    }

}
