
package com.example.verifier;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import org.springframework.web.bind.annotation.*;

@SpringBootApplication
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
public class SpringbootVerifierApp {



	public static void main(String[] args) {
		SpringApplication.run(SpringbootVerifierApp.class, args);
	}






}
            