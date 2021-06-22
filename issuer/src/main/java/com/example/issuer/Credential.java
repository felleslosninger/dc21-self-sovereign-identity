package com.example.issuer;

import com.google.gson.Gson;

import java.util.ArrayList;
import java.util.Collection;
import java.util.UUID;

public class Credential {

    private String subject; //Den beviset gjelder for
    private String message; //Beviset
    /*
    TODO: Make issuerID-type UUID.
     */
    private String issuerID; //Issuer/beviset sin id


    public Credential(String subject, String message) {
        this.subject = subject+ UUID.randomUUID();
        this.message = message;
        this.issuerID = UUID.randomUUID().toString();
    }

    public String stringifier(){
        Gson gson = new Gson();
        Collection<String> collection = new ArrayList<>();
        collection.add(subject);
        collection.add(message);
        collection.add(issuerID);

        String jsonString = gson.toJson(collection);

        return jsonString;
    }

    public String simpleStringifier(){
        return message;
    }

    public String getIssuerID() {
        return issuerID;
    }
}
