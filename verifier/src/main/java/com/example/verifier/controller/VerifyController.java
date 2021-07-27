package com.example.verifier.controller;

import com.example.verifier.service.VerifyService;
import com.example.verifier.verification.JwtVerifier;
import com.example.verifier.verification.UserIdHandler;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.lang.constant.Constable;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")

public class VerifyController {




    private final VerifyService verifyService = new VerifyService();


    @GetMapping("/api/hello")
    public String hello(@RequestParam(value = "name", defaultValue = "World") String name) {
        return String.format("Hello %s!", name);
    }

    /**
     * Route that receives and verifies a jwt token
     * @param token = the jwt token to send
     * @return a response entity containing the token, if it was verified, and a HttpStatus.OK
     */
    @PostMapping("/api/sendVP")
    public ResponseEntity<String> sendVP(@RequestBody String token) {
        return verifyService.sendVP(token);
    }

    @GetMapping("/api/tester")
    public String test(@RequestParam String token) {
        JwtVerifier jwt = new JwtVerifier();
        return jwt.verifySubUser(token);
    }

    /**
     * Route that gets if the sent jwt token was verified
     * @return a boolean true if the token was verified, false if not
     */
    @GetMapping("/api/checkVerified")
    public boolean checkVerify() {
        return verifyService.checkVerify();
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/api/sendUserID")
    public ResponseEntity<String> sendUserID(@RequestBody String id) {
        UserIdHandler idH = new UserIdHandler();
        idH.addUserId(id, false);
        return new ResponseEntity<>("test completed", HttpStatus.OK);
    }

}
