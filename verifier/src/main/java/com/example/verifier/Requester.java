package com.example.verifier;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.gson.Gson;
import org.json.JSONException;
import org.springframework.http.ResponseEntity;


import java.io.IOException;
import java.net.URI;
import java.net.URISyntaxException;
import java.net.URLEncoder;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.nio.charset.Charset;
import java.nio.charset.StandardCharsets;
import java.security.InvalidKeyException;
import java.security.KeyFactory;
import java.security.NoSuchAlgorithmException;
import java.security.PublicKey;
import java.security.spec.InvalidKeySpecException;
import java.security.spec.X509EncodedKeySpec;
import java.util.*;

public class Requester {

    private final URI endpointBaseUri;
    private final ObjectMapper objectMapper;


    public Requester(String uri) throws URISyntaxException {
        this.endpointBaseUri = new URI(uri);
        this.objectMapper = new ObjectMapper();

    }



    private String uriParam(String s) {
        return URLEncoder.encode(s, StandardCharsets.UTF_8);
    }


    private URI requestUri(String s) {
        return endpointBaseUri.resolve(uriParam(s));
    }


    public PublicKey getKeyByID(String id) {
        PublicKey publicKey = null;
        HttpRequest request = HttpRequest.newBuilder(requestUri(id)).GET().build();
        System.out.println(request);

        try {
            final HttpResponse<String> response = HttpClient.newBuilder().build().send(request,
                    HttpResponse.BodyHandlers.ofString());
            final String responseString = response.body();
            System.out.println("getKeyByID() response: " + responseString);
            Gson gson = new Gson();
            byte[] bytes = gson.fromJson(responseString, byte[].class);


            publicKey = KeyFactory.getInstance("RSA").generatePublic(new X509EncodedKeySpec(bytes));

        } catch (IOException | InterruptedException | NoSuchAlgorithmException | InvalidKeySpecException e) {
            throw new RuntimeException(e);
        }

        return publicKey;
    }

/*
    public List<Object> getCredentialInfo() {
        String id = "";
        byte[] signature = null;
        Credential credential = null;
        HttpRequest request = HttpRequest.newBuilder(requestUri("over_18")).GET().build();
        System.out.println(request);
        try {
            final HttpResponse<String> response = HttpClient.newBuilder().build().send(request,
                    HttpResponse.BodyHandlers.ofString());
            String responseString = response.body();
            System.out.println("getIDfromCredential() response: " + responseString);
            String[] split = responseString.split(" | ");
            Gson gson = new Gson();
            signature = gson.fromJson(split[0], byte[].class);
            List<String> credentialCollection = gson.fromJson(split[2], List.class);
            String subject = credentialCollection.get(0);
            String message = credentialCollection.get(1);
            id= credentialCollection.get(2);
            credential = new Credential(subject, message, id);
        } catch (IOException | InterruptedException e) {
            throw new RuntimeException(e);
        }
        List<Object> list = new ArrayList<>();
        list.add(id);
        list.add(credential);
        list.add(signature);
        return list;
    }
*/

    public VCJson getCredentialFromIssuer() {
        VCJson vcJson = null;
        List<String> credString = null;
        HttpRequest request = HttpRequest.newBuilder(requestUri("over_18")).GET().build();
        try {
            final HttpResponse<String> response = HttpClient.newBuilder().build().send(request,
                    HttpResponse.BodyHandlers.ofString());
            String responseString = response.body();
            System.out.println("getCredentialFromIssuer() response: " + responseString);

            Gson gson = new Gson();
            credString = gson.fromJson(responseString, List.class);

            System.out.println("credString = " + credString);

            vcJson = new VCJson(credString.get(0), credString.get(1), credString.get(2), credString.get(3),
                     gson.fromJson(credString.get(4), Date.class), gson.fromJson(credString.get(5), Date.class));
            System.out.println("vcJson = " + vcJson);


        } catch (IOException | InterruptedException | JSONException e) {
            throw new RuntimeException(e);
        }
        return vcJson;
    }










    public static void main(String[] args) throws Exception {


        Requester r = new Requester("http://localhost:8083/api/key/");

        // System.out.println(r.getKeyByID("bb9c615c-643d-4f28-ac74-2b90c8b8727c"));

        Requester r2 = new Requester("http://localhost:8083/api/getCredential/");

        VCJson vcJson = r2.getCredentialFromIssuer();


        System.out.println(vcJson.getIssuerID());

        PublicKey key = r.getKeyByID(vcJson.getIssuerID());
        System.out.println(key);

        SignatureVerifier sv = new SignatureVerifier();
        Gson gson = new Gson();
        byte[] bytes = gson.fromJson(vcJson.getSignature(), byte[].class);
        System.out.println(bytes);

        boolean verify = sv.verifySignature(vcJson.getPayload(), bytes, key);
         System.out.println(verify);


        // System.out.println(sv.decryptSignature((byte[]) list.get(2), new KeyGenerator().getPublicKey(), credential));

    }


}