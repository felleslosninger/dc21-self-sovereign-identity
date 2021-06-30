package com.example.issuer;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import org.jetbrains.annotations.NotNull;
import org.json.simple.JSONObject;

import java.util.Date;
import java.util.UUID;

public class VCJson {
    /*
    -   Context
    -ok Identifiers
    -ok Types
    -ok Credential Subject
    -ok Issuer
    -ok Issuance Date
    -   Proof
    -ok Expiration
    -   Status
    -   Presentations
    */
    private final JSONObject credentials;
    private final JSONObject payload;
    private final Date issuanceDate;
    private final Date expirationDate;
    private final String subject;
    private final String type;
    private final String issuerID;
    private final String cryptMethod = "RsaSignature2021";

    /**
     @param subject is the subject DID or equal identifier.
     @param type of credential. Was message in earlier versions.
     */

    public VCJson (String subject, String type) {
        this.subject = subject;
        this.type = type;
        this.issuerID = "DigDir"+ UUID.randomUUID();
        this.payload = new JSONObject();
        this.credentials = new JSONObject();
        this.issuanceDate = new Date();
        // Will expire 2 weeks from issued date.
        this.expirationDate = new Date(issuanceDate.getTime()+1209600000);
        constructVC();
    }

    private void constructVC() {
        payload.put("id", "www.digdir.no/2021/credentials/v1");
        payload.put("issuer", issuerID);
        payload.put("type", type);
        payload.put("credentialSubject", subject(subject));
        payload.put("issuanceDate", issuanceDate);
        payload.put("expirationDate", expirationDate);
        credentials.put("Full Credentials",payload);
        credentials.put("proof",proof(cryptMethod));
    }

    private JSONObject proof(String signatureMethod) {
        /*
        "type": "RsaSignature2018",
        "created": "2018-06-18T21:19:10Z",
        "proofPurpose": "assertionMethod",
        "verificationMethod": "https://example.com/jdoe/keys/1",
        "jws":
         */
        JSONObject proof = new JSONObject();
        proof.put("type",signatureMethod);
        proof.put("created",new Date());
        proof.put("verification method", "stuff");
        proof.put("proof", "signature");

        return proof;
    }

    private JSONObject subject(@NotNull String did) {
        JSONObject subject = new JSONObject();
        subject.put("id",did);
        subject.put("degree", "Bachelors");
        return subject;
    }

    public JSONObject getCredentials() {
        return credentials;
    }

    public static void main(String[] args) {
        Gson gson = new GsonBuilder().setPrettyPrinting().create();
        VCJson vcJson = new VCJson("Martin", "over-18");
        System.out.println(gson.toJson(vcJson.getCredentials()));
    }


}
