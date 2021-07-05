package com.example.verifier;

import com.google.gson.Gson;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Date;
import java.util.UUID;
public class Credential {

    private String subject; //Den beviset gjelder for
    private String type; //Type bevis
    private Date issuanceDate; //Når beviset ble utstedt
    /*
    TODO: Make issuerID-type UUID.
     */
    private String issuerID; //Issuer/beviset sin id


    public Credential(String subject, String type) {
        this.subject = subject;
        this.type = type;
        this.issuanceDate = new Date();
        this.issuerID = UUID.randomUUID().toString();
    }

    public Credential(String subject, String type, String issuerID, String date) {
        this.subject = subject;
        this.type = type;
        this.issuerID = issuerID;
        this.issuanceDate = new Date(Long.valueOf(date));
    }

    public String stringifier(){
        Gson gson = new Gson();
        Collection<String> collection = new ArrayList<>();
        collection.add(subject);
        collection.add(type);
        collection.add(String.valueOf(issuanceDate.getTime()));
        collection.add(issuerID);

        String jsonString = gson.toJson(collection);

        return jsonString;
    }

    public String simpleStringifier(){
        return type;
    }

    public String getIssuerID() {
        return issuerID;
    }

}