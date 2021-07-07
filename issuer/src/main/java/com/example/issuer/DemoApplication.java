package com.example.issuer;

import com.auth0.jwt.interfaces.DecodedJWT;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import org.json.JSONException;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.oidc.user.OidcUser;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import javax.crypto.BadPaddingException;
import javax.crypto.Cipher;
import javax.crypto.IllegalBlockSizeException;
import javax.crypto.NoSuchPaddingException;
import java.io.IOException;
import java.net.HttpURLConnection;
import java.net.URI;
import java.net.URISyntaxException;
import java.net.URL;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import javax.swing.*;
import javax.websocket.server.PathParam;
import java.nio.charset.StandardCharsets;
import java.security.*;
import java.security.interfaces.RSAPublicKey;
import java.security.spec.InvalidKeySpecException;
import java.security.spec.X509EncodedKeySpec;
import java.util.*;


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

    @GetMapping("/api/uri")
    public String testUri(@RequestParam(value = "type", defaultValue = "defaultType") String type, @RequestParam(value = "baseVC", defaultValue = "defaultVC") String baseVC) throws URISyntaxException {
        if (type.equals("defaultType") || baseVC.equals("defaultVC")){
         return "Error - Missing URL-parameters";
        }
        JwtVerifier jwtVerifier = new JwtVerifier();
        DecodedJWT decodedJWT = jwtVerifier.decodeJwt(baseVC);
        //System.out.println("JWT:  " + decodedJWT.getToken());
        FileHandler fileHandler = new FileHandler();
        //System.out.println("Issuer PK:  " + fileHandler.getPublicKey(decodedJWT.getIssuer()));
        boolean verified = jwtVerifier.verifyVC(decodedJWT.getToken(), (RSAPublicKey) fileHandler.getPublicKey(decodedJWT.getIssuer()));

        Map<String,String> typeMap = new HashMap<>();
        typeMap.put("over-18", "AgeCredential");
        typeMap.put("over-20", "AgeCredential");
        typeMap.put("førerkort-klasse-b", "DriverlicenseCredential");

        Map<String,String> claimTypeMap = new HashMap<>();
        claimTypeMap.put("over-18", "age");
        claimTypeMap.put("over-20", "age");
        claimTypeMap.put("førerkort-klasse-b", "driverlicense");

        Map<String,String> nameTypeMap = new HashMap<>();
        nameTypeMap.put("over-18", "Over 18");
        nameTypeMap.put("over-20", "Over 20");
        nameTypeMap.put("førerkort-klasse-b", "Førerkort klasse B");



        if (verified){

            try {
                Jwt newJWt = new Jwt(decodedJWT.getSubject(), "UtstederAvBevis.no", typeMap.get(type), claimTypeMap.get(type), type, nameTypeMap.get(type));
                return "BEVIS av type " + nameTypeMap.get(type) + ":  "  + newJWt.getToken();
            }catch (Exception e){
                System.out.println("ERROR: Wrong type input. Function: testUri");

                return "Type not valid.";
            }


        }


        return "BaseID not valid.";
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
    public String getCredential(@PathVariable String type) {
        // må finne løsning for å unngå hardkoding av subjectId og issuerId
        JwtTypeHandler jth = new JwtTypeHandler();

        try {
            Jwt jwt = new Jwt("testSub", "testIss", jth.getVcType(type), jth.getClaimType(type), type, jth.getName(type));
            return jwt.getToken();

        } catch(Exception e) {
            e.printStackTrace();
            return "Cannot make credential of this type. Available types: " + jth.getTypes();

        }
    }

    @GetMapping("/protectedpage")
    public String getProtectedPage(@AuthenticationPrincipal OidcUser principal, Model model) throws Exception {
        Jwt jwt = new Jwt(principal.getClaim("pid").toString(), "GrunnID-portalen.no", "BaseCredential", "baseid", "BaseID", "BaseID");
        System.out.println("ID-PORTEN TOKEN:   " + principal.getIdToken().getTokenValue());
        return jwt.getToken();
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