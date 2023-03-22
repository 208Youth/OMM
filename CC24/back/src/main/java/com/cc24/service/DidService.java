package com.cc24.service;

import com.metadium.did.MetadiumWallet;
import com.metadium.did.crypto.MetadiumKey;
import com.metadium.did.exception.DidException;
import com.metadium.did.protocol.MetaDelegator;
import com.metadium.did.verifiable.Verifier;
import com.metadium.vc.VerifiableCredential;
import com.metadium.vc.VerifiablePresentation;
import com.nimbusds.jose.JOSEException;
import com.nimbusds.jwt.SignedJWT;
import java.io.IOException;
import java.security.InvalidAlgorithmParameterException;
import java.text.ParseException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class DidService {

    private final MetaDelegator delegator;
    private final Long ONE_YEAR = 365L * 24L * 60L * 60L * 1000L;

    /**
     * @return
     * @throws DidException
     */
    public MetadiumWallet createDid() throws DidException {
        return MetadiumWallet.createDid(delegator);
    }

    /**
     * @param wallet 키를 수정할 지갑 정보
     * @throws InvalidAlgorithmParameterException
     * @throws DidException
     */
    public void updateDidKey(MetadiumWallet wallet)
        throws InvalidAlgorithmParameterException, DidException {
        wallet.updateKeyOfDid(delegator, new MetadiumKey());
    }
    
    /**
     * @param issuerWallet 발급자의 지갑 정보
     * @param credentialName 사용자에게 제공할 credential 이름
     * @param holderDid 사용자의 DID
     * @param claims credential 정보에 포함될 claim 정보
     * @return
     * @throws JOSEException
     */
    public String issueCredential(MetadiumWallet issuerWallet, String credentialName,
        String holderDid, Map<String, Object> claims) throws JOSEException {

        Date issuanceDate = new Date();
        Date expirationDate = new Date(issuanceDate.getTime() + ONE_YEAR);

        return issuerWallet.issueCredential(
            Collections.singletonList(credentialName),
            null,
            issuanceDate,
            expirationDate,
            holderDid,
            claims
        ).serialize();
    }

    /**
     * @param holderWallet 사용자의 지갑 정보
     * @param presentationName 검증자에게 제공할 presentation 이름
     * @param foundVcList 검증자에게 제공하는 credential 목록
     * @return
     * @throws ParseException
     * @throws JOSEException
     */
    public String issuePresentation(MetadiumWallet holderWallet, String presentationName,
        List<String> foundVcList) throws ParseException, JOSEException {

        Date issuanceDate = new Date();
        Date expirationDate = new Date(issuanceDate.getTime() + ONE_YEAR);

        return holderWallet.issuePresentation(
            Collections.singletonList(presentationName),
            null,
            issuanceDate,
            expirationDate,
            foundVcList
        ).serialize();
    }

    /**
     * @param serializedVP
     * @return
     * @throws ParseException
     */
    public List<SignedJWT> getCredentials(String serializedVP) throws ParseException {

        VerifiablePresentation vp = new VerifiablePresentation(SignedJWT.parse(serializedVP));
        List<SignedJWT> credentials = new ArrayList<>();

        for (Object o : vp.getVerifiableCredentials()) {
            String serializedVC = (String) o;
            SignedJWT signedVCJWT = SignedJWT.parse(serializedVC);
            credentials.add(signedVCJWT);
        }
        return credentials;
    }

    /**
     * @param signedVCJWT
     * @return
     * @throws ParseException
     * @throws IOException
     * @throws DidException
     */
    public Map<String, String> getClaims(SignedJWT signedVCJWT)
        throws ParseException, IOException, DidException {

        Map<String, String> claims = new HashMap<>();

        VerifiableCredential vc = new VerifiableCredential(signedVCJWT);
        Map<String, String> subject = vc.getCredentialSubject();
        for (Map.Entry<String, String> entry : subject.entrySet()) {
            String name = entry.getKey();
            String value = entry.getValue();
            claims.put(name, value);
        }

        return claims;
    }

    private void verify(String serializedJWT) throws ParseException, IOException, DidException {

        Verifier verifier = new Verifier();

        SignedJWT signedJwt = SignedJWT.parse(serializedJWT);
        if (!verifier.verify(signedJwt)) {
            log.info("serializedJWT 검증실패");
        } else if (signedJwt.getJWTClaimsSet().getExpirationTime() != null &&
            signedJwt.getJWTClaimsSet().getExpirationTime().getTime() < new Date().getTime()) {
            log.info("serializedJWT 만료");
        }
//            // credential 소유자 확인
//            if (!signedVc.getJWTClaimsSet().getSubject().equals(holderWallet.getDid()) ||
//                !holderDid.equals(holderWallet.getDid())) {
//                log.info("credential 소유자가 아님");
//            }
//
//            // 요구하는 발급자가 발급한 credential 인지 확인
//            VerifiableCredential credential = new VerifiableCredential(signedVc);
//            if (!credential.getIssuer().toString().equals(holderWallet.getDid())) {
//                log.info("credential 발급자 아님");
//            }
    }

    /**
     * @param holderVcList
     * @param typesOfRequireVcs
     * @return
     * @throws ParseException
     */
    private List<String> findVC(List<String> holderVcList, List<List<String>> typesOfRequireVcs)
        throws ParseException {
        List<String> ret = new ArrayList<>();

        for (String serializedVc : holderVcList) {
            VerifiableCredential credential = new VerifiableCredential(SignedJWT.parse(serializedVc));
            for (List<String> types : typesOfRequireVcs) {
                if (credential.getTypes().containsAll(types)) {
                    ret.add(serializedVc);
                }
            }
        }
        return ret;
    }

}
