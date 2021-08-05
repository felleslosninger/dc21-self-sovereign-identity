package com.example.verifier.service;

import com.example.verifier.verification.JwtVerifier;
import com.example.verifier.verification.UserIdHandler;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;


@Service
public class VerifyService {

    public ResponseEntity<String> sendVP(String token) {
        JwtVerifier verifier = new JwtVerifier();
        UserIdHandler uih = new UserIdHandler();
        boolean isVerified = verifier.verifyVP(token, "over-18");
        String userID = verifier.verifySubUser(token);
        if (isVerified) {
            if (uih.loadFromFile().get(userID).equals(false)) {
                uih.addUserId(userID, true);
            }
        }
        return new ResponseEntity<>("token: " + token + ", verified: " + isVerified + ", userID:" + userID, HttpStatus.OK);
    }


    public boolean checkVerify(String id) {
        UserIdHandler uih = new UserIdHandler();
        return uih.getIsUserVerified(id);
    }

    public ResponseEntity<String> sendUserID(String id) {
        UserIdHandler idH = new UserIdHandler();
        idH.addUserId(id, false);
        return new ResponseEntity<>("user added", HttpStatus.OK);
    }





}
