package com.example.verifier;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;

import java.io.IOException;
import java.net.URI;
import java.net.URISyntaxException;
import java.net.URLEncoder;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.nio.charset.Charset;
import java.nio.charset.StandardCharsets;
import java.security.KeyFactory;
import java.security.NoSuchAlgorithmException;
import java.security.PublicKey;
import java.security.spec.InvalidKeySpecException;
import java.security.spec.X509EncodedKeySpec;
import java.util.Arrays;
import java.util.Base64;
import java.util.HashMap;

public class Requester {

    private final URI endpointBaseUri;
    private ObjectMapper objectMapper;


    public Requester() throws URISyntaxException {
        this.endpointBaseUri = new URI("http://localhost:8080/");
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



    private static String[] convertToStrings(byte[][] byteStrings) {
        String[] data = new String[byteStrings.length];
        for (int i = 0; i < byteStrings.length; i++) {
            data[i] = new String(byteStrings[i], Charset.defaultCharset());

        }
        return data;
    }


    private static byte[][] convertToBytes(String[] strings) {
        byte[][] data = new byte[strings.length][];
        for (int i = 0; i < strings.length; i++) {
            String string = strings[i];
            data[i] = string.getBytes(Charset.defaultCharset()); // you can chose charset
        }
        return data;
    }

    public static void main(String[] args) throws URISyntaxException {
        Requester r = new Requester();

        System.out.println(r.getKeyByID("id1"));
    }
}
