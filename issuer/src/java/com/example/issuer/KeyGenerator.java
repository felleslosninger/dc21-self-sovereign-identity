package com.example.issuer;

import java.security.*;

public class KeyGenerator {

    KeyPairGenerator generator = KeyPairGenerator.getInstance("DSA");
    KeyPair keyPair;


    public KeyGenerator() throws NoSuchAlgorithmException {
        generator.initialize(2048);
        keyPair = generator.generateKeyPair();
    }


    public PrivateKey getPrivateKey(){
        return keyPair.getPrivate();
    }

    public PublicKey getPublicKey(){
        return keyPair.getPublic();
    }

}
