package com.example.issuer;

import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class CredentialTest {
    static Credential credential;
    private static String subject = "testSub";
    private static String message = "testMsg";

    @BeforeAll
            static void before(){
        credential = new Credential(subject, message);
    }


    @Test
    void stringifier() {
        String issuerID = credential.getIssuerID();
        String jsonString = credential.stringifier();

        String fullString = "[\"" + subject + "\",\"" + message+ "\",\"" + issuerID + "\"]";
        assertEquals(jsonString, fullString);
        assertEquals(jsonString.getClass(), String.class);
    }

}