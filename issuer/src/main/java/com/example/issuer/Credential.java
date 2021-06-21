package com.example.issuer;

import java.util.UUID;

public class Credential {

    private String subject;


    public Credential(String subject) {
        this.subject = subject+ UUID.randomUUID();
    }

    public String stringifier(){


        return subject;
    }
}
