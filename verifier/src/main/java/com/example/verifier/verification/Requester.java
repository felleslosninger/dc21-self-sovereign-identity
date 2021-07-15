package com.example.verifier.verification;

import com.google.gson.Gson;
import java.io.IOException;
import java.net.URI;
import java.net.URISyntaxException;
import java.net.URLEncoder;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.nio.charset.StandardCharsets;
import java.security.KeyFactory;
import java.security.NoSuchAlgorithmException;
import java.security.PublicKey;
import java.security.spec.InvalidKeySpecException;
import java.security.spec.X509EncodedKeySpec;
import java.util.Base64;


/**
 * Class that gets information from an api-server by sending HTTP requests to the server
 */
public class Requester {

    private final URI endpointBaseUri;

    /**
     * Class constructor
     * @param uri = uri-string to the api-server
     * @throws IllegalArgumentException if the param uri cannot be parsed as a URI reference
     */
    public Requester(String uri) {
        try {
            this.endpointBaseUri = new URI(uri);
        } catch (URISyntaxException e) {
            throw new IllegalArgumentException(uri + " cannot be parsed as a URI reference");
        }

    }


    /**
     * Helper method to resolve uri path to the api-server
     */
    private String uriParam(String s) {
        return URLEncoder.encode(s, StandardCharsets.UTF_8);
    }

    /**
     * Resolves the uri path to the api-server
     */
    private URI requestUri(String s) {
        return endpointBaseUri.resolve(uriParam(s));
    }


    /**
     * Method that gets the public key of the issuer with the requested ID from the api-server
     * @param id = the id to get the public key of
     * @return the public key, or null if it was not found
     */
    public PublicKey getKeyByID(String id) {
        PublicKey publicKey;
        HttpRequest request = HttpRequest.newBuilder(requestUri(id)).GET().build();
      //  System.out.println(request);
        try {
            final HttpResponse<String> response = HttpClient.newBuilder().build().send(request,
                    HttpResponse.BodyHandlers.ofString());
            final String responseString = response.body();
          System.out.println("getKeyByID() response: " + responseString);
//            Gson gson = new Gson();
//            byte[] bytes = gson.fromJson(responseString, byte[].class);


            publicKey = KeyFactory.getInstance("RSA").generatePublic(new X509EncodedKeySpec(Base64.getDecoder().decode(responseString)));
            System.out.println(Base64.getEncoder().encodeToString(publicKey.getEncoded()));
        } catch (IOException | InterruptedException | NoSuchAlgorithmException | InvalidKeySpecException e) {
            throw new RuntimeException(e);
        }

        return publicKey;
    }


    /**
     * Method that gets the VC/VP Jwt-token of the requested type
     * @param type = the type of VC/VP Jwt-token to request
     * @return the token of the requested VC/CP, or null if it was not found
     */
    public String getJwt(String type) {
        String token;
        HttpRequest request = HttpRequest.newBuilder(requestUri(type)).GET().build();
        try {
            final HttpResponse<String> response = HttpClient.newBuilder().build().send(request,
                    HttpResponse.BodyHandlers.ofString());
            System.out.println("getJwt() response: " + response);
            token = response.body();
        } catch (IOException | InterruptedException e) {
            throw new RuntimeException(e);
        }
        return token;
    }


    public static void main(String[] args) throws Exception {


      //  Requester r = new Requester("http://localhost:8083/api/key/");
        Requester r2 = new Requester("http://localhost:8083/vdr/key/");
        System.out.println(r2.getKeyByID("GrunnID-portalen.no063b9967-fa86-4168-a142-67beeb0f539e"));

       // System.out.println(r.getKeyByID("testIss2575273c-c1ff-446c-9d8c-6504af46bd14"));
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