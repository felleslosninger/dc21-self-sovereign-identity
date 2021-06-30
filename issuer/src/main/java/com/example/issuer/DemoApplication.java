package com.example.issuer;

import com.google.gson.Gson;
import org.json.JSONException;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.crypto.BadPaddingException;
import javax.crypto.Cipher;
import javax.crypto.IllegalBlockSizeException;
import javax.crypto.NoSuchPaddingException;
import java.security.*;
import java.util.Arrays;
import java.util.Collections;


@SpringBootApplication
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
public class DemoApplication {

    public static void main(String[] args) {
        SpringApplication app = new SpringApplication(DemoApplication.class);
        app.setDefaultProperties(Collections.singletonMap("server.port", 8083));
        //SpringApplication.run(DemoApplication.class, args);
        app.run(args);

    }

    @GetMapping("/hello")
    public String hello(@RequestParam(value = "name", defaultValue = "World") String name) {
        Credential credential = new Credential("name", "Over 18 år");
        KeySaver keySaver = new KeySaver(credential);
        JsonHandler jsonHandler = new JsonHandler();
        jsonHandler.saveKeysaverToJson(keySaver);

        return String.format("Hello %s!", name);

    }

    @GetMapping("/keys")
    public String keys(@RequestParam(value = "key", defaultValue = "deafult") String name) throws NoSuchAlgorithmException, NoSuchPaddingException, IllegalBlockSizeException, BadPaddingException, InvalidKeyException, SignatureException {
        KeyGenerator keyGen = new KeyGenerator();
        Credential credential = new Credential("Digdir", "Over 18 år");
        Signing signing = new Signing(keyGen.getPrivateKey(), credential);

        byte[] signature = signing.getSignature();
        boolean res = decryptSignature(signature, keyGen.getPublicKey(), credential);

        //return String.format("Public Key: %s/n Private key: %s",keyGen.getPublicKey(), keyGen.getPrivateKey());
        //return String.format("Public Key: %s Private key: %s",keyGen.getMOCKPublicKey(), keyGen.getMOCKPrivateKey());
        return String.format("Decryption result:    %s ",res);

    }

    @GetMapping("/api/key/{id}")
    public String getKey(@PathVariable String id) {
        FileHandler fileHandler = new FileHandler();
        try{
            System.out.println(fileHandler.getPublicKeyAsString(id));
            return fileHandler.getPublicKeyAsString(id);
        }catch (Exception e){
            System.out.println("No key found.");
            return "No key found with this id";
        }
    }

    @GetMapping("/api/getCredential/{type}")
    public ResponseEntity<String> getCredential(@PathVariable String type) throws JSONException {
        HttpHeaders responseHeaders = new org.springframework.http.HttpHeaders();
        //Credential credential = new Credential("Digdir", message);
        VCJson credential = new VCJson("subject", type);
        KeyGenerator keyGen = null;
        Signing signing = null;
        try {
            keyGen = new KeyGenerator();
            signing = new Signing(keyGen.getPrivateKey(), credential);
        } catch (Exception e) {
           e.printStackTrace();
        }

        FileHandler fileHandler = new FileHandler();
        PublicKey publicKey = keyGen.getPublicKey();
        System.out.println(publicKey);
        fileHandler.addPublicKey(credential.getIssuerID(), publicKey);
        System.out.println(fileHandler.getPublicKey(credential.getIssuerID()));
        String signedMessage = signing.getSignatureAsString();
        System.out.println(credential.getIssuerID());
        credential.setSignature(signedMessage);

        //return signedMessage + "  |  " + credential.stringifier();

        responseHeaders.set("Hva-som-helst", "200");

        return ResponseEntity.ok().headers(responseHeaders).body(credential.stringifier());
        //return new ResponseEntity<String>("Ett eller annet", responseHeaders, HttpStatus.CREATED);
    }




    public boolean decryptSignature(byte[] signature, PublicKey publicKey, Credential message) throws NoSuchPaddingException, NoSuchAlgorithmException, InvalidKeyException, IllegalBlockSizeException, BadPaddingException {

        Cipher cipher = Cipher.getInstance("RSA");
        cipher.init(Cipher.DECRYPT_MODE, publicKey);
        byte[] decryptedMessageHash = cipher.doFinal(signature);

        /*
        byte[] messageBytes = message.stringifier().getBytes();
        MessageDigest md = MessageDigest.getInstance("SHA-256");
        byte[] messageHash = md.digest(messageBytes);
         */

        System.out.println(new String(message.stringifier().getBytes()));
        return Arrays.equals(decryptedMessageHash, message.stringifier().getBytes());
    }

}