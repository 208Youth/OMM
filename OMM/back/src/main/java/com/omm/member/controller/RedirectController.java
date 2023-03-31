package com.omm.member.controller;

import com.omm.exception.CustomException;
import com.omm.jwt.JwtFilter;
import com.omm.member.model.dto.AuthDto;
import com.omm.member.model.dto.TokenDto;
import com.omm.member.service.AuthService;
import com.omm.util.error.ErrorCode;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.view.RedirectView;

import java.net.URI;

@Controller
@RequestMapping("/sign")
public class RedirectController {

    private AuthService authService;
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

    @GetMapping("/{type}")
    public RedirectView moveToCC24Sign(@PathVariable String type) {


        if (type.equals("SIGNIN")) {
            return new RedirectView("https://localhost:3000/login?type=SIGNIN");
        } else if (type.equals("SIGNUP")) {
            return new RedirectView("https://localhost:3000/login?type=SIGNUP");
        } else {
            throw new CustomException(ErrorCode.CANNOT_AUTHORIZE_MEMBER);
        }
    }

    @GetMapping("/certificate/{type}")
    public RedirectView moveToCC24Certificate(@PathVariable String type) {

        switch (type) {
            case "UniversityCredential": case "CertificateCredential": case "JobCredential":
            case "IncomeCredential": case "EstateCredential":  case "HealthCredential":
                return new RedirectView("https://localhost:3000/certificate?type="+ type);
            default:
                throw new CustomException(ErrorCode.CANNOT_AUTHORIZE_MEMBER);
        }
    }

    @PostMapping("/{type}")
    public ResponseEntity<Void> doSign(@RequestBody AuthDto authDto) {
        String jwt = authService.authenticate(authDto.getHolderDid(), authDto.getVpJwt());

        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.setLocation(URI.create("http://localhost:5173/api/main"));
        httpHeaders.add(JwtFilter.AUTHORIZATION_HEADER, "Bearer " + jwt);

        return new ResponseEntity<>(httpHeaders, HttpStatus.MOVED_PERMANENTLY);
    }

    @PostMapping("/certificate/{type}")
    public ResponseEntity<?> getCertificate(){
        return null;
    }

}
