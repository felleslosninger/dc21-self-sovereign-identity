package com.example.verifier;

import java.security.KeyPair;
import java.security.KeyPairGenerator;
import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;

public class AsymmetricKeyGenerator {

    private final String type;

    public AsymmetricKeyGenerator(String type) {
        this.type = type;
    }

    public KeyPair generateKeyPair() throws NoSuchAlgorithmException {
        SecureRandom secureRandom = new SecureRandom();
        KeyPairGenerator keyPairGenerator = KeyPairGenerator.getInstance(type);

        keyPairGenerator.initialize(2048, secureRandom);
        return keyPairGenerator.generateKeyPair();
    }

    public static void main(String[] args) throws NoSuchAlgorithmException {
        AsymmetricKeyGenerator kg = new AsymmetricKeyGenerator("RSA");
        KeyPair pair = kg.generateKeyPair();
        System.out.println(pair.getPublic().getEncoded());


    }

    public String getType() {
        return type;
    }
}
