
package com.example.verifier;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import org.json.JSONException;
import org.json.JSONObject;


import java.util.ArrayList;
import java.util.Date;
import java.util.List;
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

    public VCJson (String subject, String type) throws JSONException {
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

    public VCJson(String subject, String type, String issuerID, String signature) throws JSONException {
        this.subject = subject;
        this.type = type;
        this.issuerID = issuerID;
        this.payload = new JSONObject();
        this.credentials = new JSONObject();
        this.issuanceDate = new Date();
        // Will expire 2 weeks from issued date.
        this.expirationDate = new Date(issuanceDate.getTime()+1209600000);
        constructVC();
        setSignature(signature);
    }

    private void constructVC() throws JSONException {
        payload.put("id", "www.digdir.no/2021/credentials/v1");
        payload.put("issuer", issuerID);
        payload.put("type", type);
        payload.put("credentialSubject", subject(subject));
        payload.put("issuanceDate", issuanceDate);
        payload.put("expirationDate", expirationDate);
        credentials.put("Full Credentials",payload);
        credentials.put("proof",proof(cryptMethod, "signature"));
    }

    private JSONObject proof(String signatureMethod, String signature) throws JSONException {
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
        proof.put("signature", signature);

        return proof;
    }

    private JSONObject subject(String did) throws JSONException {
        JSONObject subject = new JSONObject();
        subject.put("id",did);
        subject.put("degree", "Bachelors");
        return subject;
    }

    public JSONObject getCredentials() {
        return credentials;
    }


    public String getSubject() {
        return this.subject;
    }

    public String getType() {
        return this.type;
    }

    public String getIssuerID() {
        return this.issuerID;
    }

    public void setSignature(String signature) throws JSONException {
        credentials.put("proof", proof(cryptMethod, signature));
    }

    public String getSignature() throws JSONException {
        return credentials.getJSONObject("proof").getString("signature");
    }

    public String stringifier() throws JSONException {
        Gson gson = new Gson();
        List<String> list = new ArrayList<>();
        list.add(subject);
        list.add(type);
        list.add(issuerID);
        list.add(getSignature());

        String jsonString = gson.toJson(list);
        return jsonString;
    }




    public static void main(String[] args) throws JSONException {
        Gson gson = new GsonBuilder().setPrettyPrinting().create();
        VCJson vcJson = new VCJson("Martin", "over-18");
        vcJson.setSignature("testSetSignature");
        System.out.println(vcJson.getSignature());
        System.out.println(gson.toJson(vcJson.getCredentials()));
    }
}