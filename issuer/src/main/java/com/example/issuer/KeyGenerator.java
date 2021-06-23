package com.example.issuer;

import com.nimbusds.jose.jwk.JWK;
import com.nimbusds.jose.jwk.KeyUse;
import com.nimbusds.jose.jwk.RSAKey;

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

    public String getMOCKPrivateKey()  {
        File file = new File("C:\\Users\\camp-jhv\\IdeaProjects\\digdir-camp-2021-VC\\issuer\\src\\main\\resources\\PrivateKey.txt");
        Scanner sc = null;
        try {
            sc = new Scanner(file);
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        }
        String total = "";

        while (sc.hasNextLine()){
          //  System.out.println(sc.nextLine());
            total +=sc.nextLine();
        }

        return total;
    }

    public String getMOCKPublicKey() {

        File file = new File("C:\\Users\\camp-jhv\\IdeaProjects\\digdir-camp-2021-VC\\issuer\\src\\main\\resources\\PublicKey.txt");
        Scanner sc = null;
        try {
            sc = new Scanner(file);
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        }
        String total = "";

        while (sc.hasNextLine()){
          //  System.out.println(sc.nextLine());
            total +=sc.nextLine();
        }


        return total;
    }

    public String generateJWK() {
        JWK jwk = new RSAKey.Builder((RSAPublicKey)keyPair.getPublic())
                .privateKey((RSAPrivateKey)keyPair.getPrivate())
                .keyUse(KeyUse.SIGNATURE)
                .keyID(UUID.randomUUID().toString())
                .build();
        return jwk.toJSONString();


    }

}