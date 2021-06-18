package com.example.issuer;

public class Credential {

    private String subject;


    public Credential(String subject) {
        this.subject = subject;
    }

    public String stringifier(){


        return subject;
    }
}
