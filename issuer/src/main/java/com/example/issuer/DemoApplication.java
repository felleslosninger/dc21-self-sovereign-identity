package com.example.issuer;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.crypto.BadPaddingException;
import javax.crypto.Cipher;
import javax.crypto.IllegalBlockSizeException;
import javax.crypto.NoSuchPaddingException;
import java.security.InvalidKeyException;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.Arrays;


@SpringBootApplication
@RestController
public class DemoApplication {

    public static void main(String[] args) {
        SpringApplication.run(DemoApplication.class, args);
    }

    @GetMapping("/hello")
    public String hello(@RequestParam(value = "name", defaultValue = "World") String name) {
        KeySaver keySaver = new KeySaver(name, "test");
        JsonHandler jsonHandler = new JsonHandler();
        jsonHandler.saveKeysaverToJson(keySaver);

        return String.format("Hello %s!", name);

    }

    @GetMapping("/keys")
    public String keys(@RequestParam(value = "key", defaultValue = "deafult") String name) throws NoSuchAlgorithmException, NoSuchPaddingException, IllegalBlockSizeException, BadPaddingException, InvalidKeyException {
        KeyGenerator keyGen = new KeyGenerator();
        Signing signing = new Signing();
        byte[] signature = signing.sign(keyGen);
        boolean res = decryptSignature(signature, keyGen, signing);

        //return String.format("Public Key: %s/n Private key: %s",keyGen.getPublicKey(), keyGen.getPrivateKey());
        //return String.format("Public Key: %s Private key: %s",keyGen.getMOCKPublicKey(), keyGen.getMOCKPrivateKey());
        return String.format("Decryption result:    %s ",res);

    }

    @GetMapping("/fileTest")
    public String fileTest(@RequestParam(value = "f", defaultValue = "yo") String f) {
        JsonHandler jh = new JsonHandler();
        KeySaver keySaver = new KeySaver(f, "Fortune 500");
        jh.saveToFile(keySaver);
        jh.readFile();
        return String.format("%s!, what's up dawg", f);
    }


    public boolean decryptSignature(byte[] signature, KeyGenerator keyGenerator, Signing signing) throws NoSuchPaddingException, NoSuchAlgorithmException, InvalidKeyException, IllegalBlockSizeException, BadPaddingException {

        Cipher cipher = Cipher.getInstance("RSA");
        cipher.init(Cipher.DECRYPT_MODE, keyGenerator.getPublicKey());
        byte[] decryptedMessageHash = cipher.doFinal(signature);

        byte[] messageBytes = signing.credential.stringifier().getBytes();
        MessageDigest md = MessageDigest.getInstance("SHA-256");
        byte[] messageHash = md.digest(messageBytes);

        return Arrays.equals(decryptedMessageHash, messageHash);
    }

}