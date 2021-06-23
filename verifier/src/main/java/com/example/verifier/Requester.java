package com.example.verifier;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import org.springframework.boot.autoconfigure.ldap.embedded.EmbeddedLdapProperties;


import javax.crypto.BadPaddingException;
import javax.crypto.Cipher;
import javax.crypto.IllegalBlockSizeException;
import javax.crypto.NoSuchPaddingException;
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
    private ObjectMapper objectMapper;


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

            String[] split = responseString.split("  |  ");


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





    public static void main(String[] args) throws Exception {
        Requester r = new Requester("http://localhost:8083/api/key/");

        System.out.println(r.getKeyByID("bb9c615c-643d-4f28-ac74-2b90c8b8727c"));

        Requester r2 = new Requester("http://localhost:8083/api/getCredential/");

        System.out.println(r2.getCredentialInfo());

        List<Object> list = r2.getCredentialInfo();

        PublicKey key = r.getKeyByID((String) list.get(0));
        System.out.println(key);

        SignatureVerifier sv = new SignatureVerifier();

        System.out.println(sv.decryptSignature((byte[]) list.get(2), new KeyGenerator().getPublicKey(), (Credential) list.get(1)));

    }


}
