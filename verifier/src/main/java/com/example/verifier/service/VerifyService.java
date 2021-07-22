package com.example.verifier.service;

import com.example.verifier.verification.JwtVerifier;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.lang.reflect.Array;

@Service
public class VerifyService {

    private boolean verified = false;


    public ResponseEntity<String> sendVP(String token) {
        JwtVerifier verifier = new JwtVerifier();
        verified = verifier.verifyVP(token, "over-18");
        String userID = verifier.verifySubUser(token);
        return new ResponseEntity<>("token: " + token + ", verified: " + verified, HttpStatus.OK);
    }


    public boolean checkVerify() {
        return this.verified;
    }





}
