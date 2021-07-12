package com.digdir.issuer.service;

import com.auth0.jwt.interfaces.DecodedJWT;
import com.digdir.issuer.jwt.Jwt;
import com.digdir.issuer.jwt.JwtVerifier;
import com.digdir.issuer.storage.FileHandler;
import com.digdir.issuer.storage.JwtTypeHandler;
import org.springframework.stereotype.Service;

import java.net.URISyntaxException;
import java.security.interfaces.RSAPublicKey;

@Service
public class VcService {

    public String getVC(String type, String baseVC){

        if (type.equals("defaultType") || baseVC.equals("defaultVC")){
            return "Error - Missing URL-parameters";
        }
        JwtVerifier jwtVerifier = new JwtVerifier();
        DecodedJWT decodedJWT = jwtVerifier.decodeJwt(baseVC);
        //System.out.println("JWT:  " + decodedJWT.getToken());
        FileHandler fileHandler = new FileHandler();
        //System.out.println("Issuer PK:  " + fileHandler.getPublicKey(decodedJWT.getIssuer()));
        boolean verified = false;
        try {
            verified = jwtVerifier.verifyVC(decodedJWT.getToken(), (RSAPublicKey) fileHandler.getPublicKey(decodedJWT.getIssuer()));
        } catch (URISyntaxException e) {
            System.out.println("Problem in VcService, problems with verifying");
        }


        JwtTypeHandler jth = new JwtTypeHandler();

        if (verified){
            try {
                Jwt jwt = new Jwt(decodedJWT.getSubject(), "UtsederAvBevis.no", jth.getVcType(type), jth.getClaimType(type), type, jth.getName(type));
                return jwt.getToken();

            } catch(Exception e) {
                e.printStackTrace();
                return "Cannot make credential of this type. Available types: " + jth.getTypes();

            }
        }
        return "BaseID not valid.";
}
}
