package com.digdir.issuer.util;

import java.security.*;

/**
 * Class for generating pairs of public and private keys with RSA
 */
public class KeyGenerator {

    KeyPairGenerator generator = KeyPairGenerator.getInstance("RSA");
    KeyPair keyPair;

    /**
     * Constructor initalizes keygenerator with keySize 2048 and creates keypair
     * @throws NoSuchAlgorithmException if algorithm not exists.
     */
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
