package com.example.verifier;


import java.io.File;
import java.io.FileNotFoundException;
import java.security.*;
import java.security.interfaces.RSAPrivateKey;
import java.security.interfaces.RSAPublicKey;
import java.util.Scanner;
import java.util.UUID;

public class KeyGenerator {

    KeyPairGenerator generator = KeyPairGenerator.getInstance("RSA");
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
