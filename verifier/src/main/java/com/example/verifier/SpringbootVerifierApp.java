
package com.example.verifier;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;



@SpringBootApplication
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
public class SpringbootVerifierApp {


	private boolean verified = false;

	public static void main(String[] args) {
		SpringApplication.run(SpringbootVerifierApp.class, args);
	}

	@GetMapping("/api/hello")
	public String hello(@RequestParam(value = "name", defaultValue = "World") String name) {
		return String.format("Hello %s!", name);
	}

	@PostMapping("/api/sendCredential")
	public ResponseEntity<String> sendCredential(@RequestBody String token) {
		JwtVerifier verifier = new JwtVerifier();
		verified = verifier.verifyToken(token);
		return new ResponseEntity<>("token: " + token + ", verified: " + verified, HttpStatus.OK);
	}


	@GetMapping("/api/checkVerified")
	public boolean checkVerify() {
		return this.verified;
	}




}
            