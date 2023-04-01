package com.omm.member.controller;

import com.omm.exception.CustomException;
import com.omm.jwt.JwtFilter;
import com.omm.member.model.dto.AuthDto;
import com.omm.member.model.dto.RegistDto;
import com.omm.member.model.dto.TokenDto;
import com.omm.member.service.AuthService;
import com.omm.member.service.MemberService;
import com.omm.util.error.ErrorCode;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.view.RedirectView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.net.URI;
import java.net.URISyntaxException;

@RestController
@RequiredArgsConstructor
@RequestMapping("/sign")
public class RedirectController {

    private final AuthService authService;

    private final MemberService memberService;

//    @RequestMapping("/test2")
//    public ModelAndView test2(HttpServletRequest request) {
//        // ...
//        ModelAndView mav = new ModelAndView();
//        mav.addObject("a", a);
//        mav.addObject("b", b);
//        mav.addObject("c", 99);
//        mav.setViewName("test/test2"); // 뷰 이름 설정
//        return mav;
//    }

//    @GetMapping("/{type}")
//    public void moveToCC24Sign(@PathVariable String type, HttpServletResponse response) throws IOException {
//        String toUrl = "http://localhost:3000/login?type=";
//
//        if (type.equals("SIGNIN") || type.equals("SIGNUP")) {
//            toUrl += type;
//        } else {
//            throw new CustomException(ErrorCode.CANNOT_AUTHORIZE_MEMBER);
//        }
//        System.out.println(toUrl);
//
//        response.sendRedirect(toUrl);
//    }

    @GetMapping("/{type}")
    public String moveToCC24Sign(@PathVariable String type) throws IOException {
        String toUrl = "http://localhost:3000/login?type=";

        if (type.equals("SIGNIN") || type.equals("SIGNUP")) {
            toUrl += type;
        } else {
            throw new CustomException(ErrorCode.CANNOT_AUTHORIZE_MEMBER);
        }

        return toUrl;
    }

//
//    @GetMapping("/{type}")
//    public ResponseEntity<Object> moveToCC24Sign(@PathVariable String type) throws URISyntaxException {
////    public ModelAndView moveToCC24Sign(@PathVariable String type) throws URISyntaxException {
//        String toUrl = "http://localhost:3000/login?type=";
//
//        if (type.equals("SIGNIN") || type.equals("SIGNUP")) {
//            toUrl += type;
//        } else {
//            throw new CustomException(ErrorCode.CANNOT_AUTHORIZE_MEMBER);
//        }
//        System.out.println(toUrl);
//
//        URI redirectUri = new URI("http://localhost:3000/");
//        HttpHeaders httpHeaders = new HttpHeaders();
//        httpHeaders.setLocation(URI.create(toUrl));
////        httpHeaders.setLocation(redirectUri);
//
//        return new ResponseEntity<>(httpHeaders, HttpStatus.SEE_OTHER);
////        URI redirectUri = new URI("http://www.naver.com");
////        HttpHeaders httpHeaders = new HttpHeaders();
////        httpHeaders.setLocation(redirectUri);
////        return new ResponseEntity<>(httpHeaders, HttpStatus.SEE_OTHER);
////        String projectUrl = "redirect:http://localhost:3000/login?type=SIGNIN";
////        return new ModelAndView("redirect:" + projectUrl);
//    }

    @GetMapping("/certificate/{type}")
    public RedirectView moveToCC24Certificate(@PathVariable String type) {

        switch (type) {
            case "UniversityCredential":
            case "CertificateCredential":
            case "JobCredential":
            case "IncomeCredential":
            case "EstateCredential":
            case "HealthCredential":
                return new RedirectView("http://localhost:3000/certificate?type=" + type);
            default:
                throw new CustomException(ErrorCode.CANNOT_AUTHORIZE_MEMBER);
        }
    }

    @PostMapping("/{type}")
    public String doSign(@PathVariable("type") String type, @RequestBody AuthDto authDto) throws URISyntaxException {
        System.out.println("hellohello");
        System.out.println(type);
        System.out.println(authDto.getHolderDid());
        System.out.println(authDto.getVpJwt());

        System.out.println(memberService.existDidAddress(authDto.getHolderDid()));
        URI target = null;

        // 로그인, 회원가입에 따라 분기
        switch (type) {
            case "SIGNUP":
                if (!memberService.existDidAddress(authDto.getHolderDid())) {
                    RegistDto registDto = authService.registAuth(authDto);
                    memberService.addMember(registDto);
                    target = new URI("http://localhost:5173/main");
                } else {
//                    return new ResponseEntity<>("로그인하세요.", HttpStatus.BAD_REQUEST);
                    return "#";
                }
                break;
            case "SIGNIN":
                if (memberService.existDidAddress(authDto.getHolderDid())) {
                    target = new URI("http://localhost:5173/main");
                } else {
//                    return new ResponseEntity<>("회원가입하세요.", HttpStatus.BAD_REQUEST);
                    return "#";
                }
                break;
            default:
                throw new CustomException(ErrorCode.CANNOT_AUTHORIZE_MEMBER);
        }

        System.out.println(target);

        String jwt = authService.authenticate(authDto.getHolderDid(), authDto.getVpJwt());

        HttpHeaders httpHeaders = new HttpHeaders();
//        httpHeaders.setLocation(target);
        httpHeaders.add(JwtFilter.AUTHORIZATION_HEADER, "Bearer " + jwt);

//        return new ResponseEntity<>(httpHeaders, HttpStatus.MOVED_PERMANENTLY);
//        return ResponseEntity.status(HttpStatus.SEE_OTHER)
//                .headers(httpHeaders).location(URI.create("http://localhost:5173/main")).build();
        return "http://localhost:5173/main";
    }

    @PostMapping("/certificate/{type}")
    public ResponseEntity<?> getCertificate() {
        return null;
    }

}
