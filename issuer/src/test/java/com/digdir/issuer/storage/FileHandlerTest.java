package com.digdir.issuer.storage;

import com.digdir.issuer.storage.FileHandler;
import com.digdir.issuer.util.KeyGenerator;
import com.google.gson.Gson;
import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;

import java.security.NoSuchAlgorithmException;
import java.security.PublicKey;

import static org.junit.jupiter.api.Assertions.*;

class FileHandlerTest {
    static FileHandler fileHandler;
    private static final String issuerId = "idTest1122";
    private static PublicKey publicKey;
    static KeyGenerator keyGenerator;

    @BeforeAll
    static void before() throws NoSuchAlgorithmException {
        keyGenerator = new KeyGenerator();
        fileHandler = new FileHandler();
        publicKey = keyGenerator.getPublicKey();
        fileHandler.addPublicKey(issuerId, publicKey);

    }



    @Test
    void getPublicKey() {
        PublicKey publicKeyFromFile = fileHandler.getPublicKey(issuerId);
        assertEquals(publicKeyFromFile, publicKey);
    }

    @Test
    void getPublicKeyAsString() {
        String pkAsString = fileHandler.getPublicKeyAsString(issuerId);

        byte[] jsonPk = publicKey.getEncoded();
        //System.out.println(jsonPk);
        Gson gson = new Gson();
        String pkAsString_main = gson.toJson(jsonPk);



        assertEquals(pkAsString, pkAsString_main);
    }

    @AfterAll
    static void teardown(){
        fileHandler.removeKeyByID("idTest1122");
    }


}