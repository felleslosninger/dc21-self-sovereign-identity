package com.example.verifier;

import java.net.URISyntaxException;

public class VerifySignatureFromApiApplication {

    public static void main(String[] args) throws URISyntaxException {
        Requester reqToKey = new Requester("http://localhost:8083/api/key/");
        Requester reqToCredential = new Requester("http://localhost:8083/api/getCredential/over_18/");

    }

}
