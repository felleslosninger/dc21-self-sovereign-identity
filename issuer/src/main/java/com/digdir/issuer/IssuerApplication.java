package com.digdir.issuer;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.Collections;


@SpringBootApplication
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class IssuerApplication {


    public static void main(String[] args) {
        SpringApplication app = new SpringApplication(IssuerApplication.class);
        app.run(args);
    }

}