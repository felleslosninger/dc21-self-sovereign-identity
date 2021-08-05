package com.example.verifier.controller;

import com.example.verifier.service.VerifyService;
import com.example.verifier.verification.UserIdHandler;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")

public class VerifyController {

    private final VerifyService verifyService = new VerifyService();


    /**
     * Route that receives and verifies a jwt token
     * @param token = the jwt token to send
     * @return a response entity containing the token, if it was verified, and a HttpStatus.OK
     */
    @PostMapping("/api/sendVP")
    public ResponseEntity<String> sendVP(@RequestBody String token) {
        return verifyService.sendVP(token);
    }

    /**
     * Route that gets if the given userID is verified
     * @param id = userID
     * @return a boolean true if the token was verified, false if not
     */
    @GetMapping("/api/checkVerified")
    public boolean checkVerify(@RequestParam(value = "id") String id) {
        return verifyService.checkVerify(id);
    }

    /**
     * Route that lets verifier post a userID
     * @return a response entity which states that the user was added and HttpStatus.OK
     */
    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/api/sendUserID")
    public ResponseEntity<String> sendUserID(@RequestBody String id) {
        return verifyService.sendUserID(id);
    }

}
