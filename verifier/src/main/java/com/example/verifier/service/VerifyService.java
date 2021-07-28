package com.example.verifier.service;

import com.example.verifier.verification.JwtVerifier;
import com.example.verifier.verification.UserIdHandler;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.lang.reflect.Array;

@Service
public class VerifyService {

    //private boolean verified = false;


    public ResponseEntity<String> sendVP(String token) {
        JwtVerifier verifier = new JwtVerifier();
        UserIdHandler uih = new UserIdHandler();
        boolean isVerified = verifier.verifyVP(token, "over-18");
        String userID = verifier.verifySubUser(token);
        if (isVerified) {
            if (uih.loadFromFile().get(userID)) {
                uih.loadFromFile().put(userID, true);
            }
        }
        return new ResponseEntity<>("token: " + token + ", verified: " + isVerified + ", userID:" + userID, HttpStatus.OK);

    }


//    public boolean checkVerify() {
//        return this.verified;
//    }

    public boolean checkVerify(String id) {
        UserIdHandler uih = new UserIdHandler();
        return uih.getIsUserVerified(id);
    }





}
