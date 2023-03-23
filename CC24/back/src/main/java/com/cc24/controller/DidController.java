package com.cc24.controller;

import com.cc24.exception.CustomException;
import com.cc24.model.dto.did.request.CredentialRequestDto;
import com.cc24.model.dto.did.request.PresentationRequestDto;
import com.cc24.model.dto.did.request.VerifyPresentationRequestDto;
import com.cc24.service.DidService;
import com.cc24.util.error.ErrorCode;
import com.metadium.did.MetadiumWallet;
import com.metadium.did.exception.DidException;
import com.metadium.vc.VerifiablePresentation;
import com.nimbusds.jose.JOSEException;
import com.nimbusds.jwt.SignedJWT;
import java.io.IOException;
import java.text.ParseException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/did")
@AllArgsConstructor
public class DidController {

    private final DidService didService;

    @PostMapping
    public ResponseEntity<?> createWallet() {
        try {
            MetadiumWallet wallet = didService.createDid();
            return new ResponseEntity<>(wallet.toJson(), HttpStatus.OK);
        } catch (DidException e) {
            throw new CustomException(ErrorCode.DID_ERROR);
        }
    }

    @PostMapping("/credential/personalId")
    public ResponseEntity<?> createPersonalIdCredential(
        @RequestBody CredentialRequestDto credentialRequestDto) {

        try {
            MetadiumWallet holderWallet = MetadiumWallet.fromJson(
                credentialRequestDto.getWalletJson());

            String vc = didService.issueCredential(
                credentialRequestDto.getCredentialName(),
                holderWallet.getDid(),
                credentialRequestDto.getClaims());

            return new ResponseEntity<>(vc, HttpStatus.OK);
        } catch (JOSEException | ParseException e) {
            throw new CustomException(ErrorCode.DID_ERROR);
        }
    }

    @PostMapping("/presentation")
    public ResponseEntity<?> createPresentation(
        @RequestBody PresentationRequestDto presentationRequestDto) {

        try {
            MetadiumWallet holderWallet = MetadiumWallet.fromJson(
                presentationRequestDto.getWalletJson());

            List<String> foundVcList = didService.findVC(
                presentationRequestDto.getHolderVcList(),
                presentationRequestDto.getTypesOfRequireVcs());
            for (String serializedJWT : foundVcList) {
                SignedJWT signedJwt = SignedJWT.parse(serializedJWT);
                didService.verify(signedJwt, holderWallet.getDid());
            }
            String vp = didService.issuePresentation(holderWallet,
                presentationRequestDto.getPresentationName(), foundVcList);

            return new ResponseEntity<>(vp, HttpStatus.OK);
        } catch (ParseException | JOSEException | IOException | DidException e) {
            throw new CustomException(ErrorCode.DID_ERROR);
        }
    }

    @GetMapping("/presentation")
    public ResponseEntity<?> verifyPresentation(
        @RequestBody VerifyPresentationRequestDto verifyPresentationRequestDto) {

        try {
            MetadiumWallet holderWallet = MetadiumWallet.fromJson(
                verifyPresentationRequestDto.getWalletJson());

            VerifiablePresentation vp = new VerifiablePresentation(
                SignedJWT.parse(verifyPresentationRequestDto.getSerializedVP()));
            List<SignedJWT> credentials = didService.getCredentials(vp);
            Map<String, String> claims = new HashMap<>();
            for (SignedJWT credential : credentials) {
                didService.verify(credential, holderWallet.getDid(), vp.getHolder().toString());
                claims.putAll(didService.getClaims(credential));
            }

            return new ResponseEntity<>(claims, HttpStatus.OK);
        } catch (ParseException | IOException | DidException e) {
            throw new CustomException(ErrorCode.DID_ERROR);
        }
    }

}
