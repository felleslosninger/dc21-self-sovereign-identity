package com.example.issuer;

import org.json.JSONException;
import org.json.JSONObject;



public class CredentialSubject {


    private final String claimType;
    private final String type;
    private final String name;

    /**
     *
     * @param claimType =  type of credentialSubject i.e. age, degree
     * @param type = type of claimType i.e. over-18, over-20
     * @param name = human-readable name i.e. Over 18, Over 20
     */
    public CredentialSubject(String claimType, String type, String name){
        this.claimType = claimType;
        this.type = type;
        this.name = name;
    }


    public JSONObject getCredentialSubject() throws JSONException {


        return null;
    }


}
