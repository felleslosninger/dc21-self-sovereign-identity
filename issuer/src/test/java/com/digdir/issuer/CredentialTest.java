package com.digdir.issuer;

import com.digdir.issuer.credentials.old.Credential;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class CredentialTest {
    static Credential credential;
    private static final String subject = "testSub";
    private static final String message = "testMsg";

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