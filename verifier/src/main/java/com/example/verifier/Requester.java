package com.example.verifier;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.gson.Gson;
import org.json.JSONException;
import org.springframework.boot.autoconfigure.security.oauth2.resource.OAuth2ResourceServerProperties;
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



/*    public VCJson getCredentialFromIssuer() {
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
    }*/


    public String getJwt() {
        String token = null;
        HttpRequest request = HttpRequest.newBuilder(requestUri("over_18")).GET().build();
        try {
            final HttpResponse<String> response = HttpClient.newBuilder().build().send(request,
                    HttpResponse.BodyHandlers.ofString());
            System.out.println("getJwt() response: " + response);
            String responseString = response.body();
            token = responseString;
        } catch (IOException | InterruptedException e) {
            throw new RuntimeException(e);
        }
        return token;
    }


    public static void main(String[] args) throws Exception {


        Requester r = new Requester("http://localhost:8083/api/key/");
        Requester r2 = new Requester("http://localhost:8083/api/getCredential/");
        System.out.println(r2.getJwt());
        System.out.println(r.getKeyByID("testIss2575273c-c1ff-446c-9d8c-6504af46bd14"));
/*

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
*/


        // System.out.println(sv.decryptSignature((byte[]) list.get(2), new KeyGenerator().getPublicKey(), credential));

    }


}