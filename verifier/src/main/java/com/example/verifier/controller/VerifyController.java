package com.example.verifier.controller;

import com.example.verifier.service.VerifyService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.lang.constant.Constable;

@RestController
public class   VerifyController {



    private VerifyService verifyService = new VerifyService();


    @GetMapping("/api/hello")
    public String hello(@RequestParam(value = "name", defaultValue = "World") String name) {
        return String.format("Hello %s!", name);
    }

    /**
     * Route that receives and verifies a jwt token
     * @param token = the jwt token to send
     * @return a response entity containing the token, if it was verified, and a HttpStatus.OK
     */
    @PostMapping("/api/sendCredential")
    public ResponseEntity<String> sendCredential(@RequestBody String token) {
        return verifyService.sendCredential(token);
    }






    /**
     * Route that gets if the sent jwt token was verified
     * @return a boolean true if the token was verified, false if not
     */
    @GetMapping("/api/checkVerified")
    public boolean checkVerify() {
        return verifyService.checkVerify();
    }


}
