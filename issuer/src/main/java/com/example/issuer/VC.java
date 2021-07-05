package com.example.issuer;

import com.fasterxml.jackson.core.PrettyPrinter;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import org.json.JSONException;

import java.util.ArrayList;
import java.util.Collection;

public class VC {
    private ArrayList<String> context;
    private ArrayList<String> type;
    private CredentialSubject credentialSubject;


    public VC(ArrayList<String> context, ArrayList<String> type, CredentialSubject credentialSubject){
        this.context = context;
        this.type = type;
        this.credentialSubject = credentialSubject;

    }

    public String getVcAsString() throws JSONException {
        Gson gson = new GsonBuilder().setPrettyPrinting().create();
        Collection<String> collection = new ArrayList<>();
        collection.add(context.toString());
        collection.add(type.toString());
        collection.add(credentialSubject.getCredentialSubject().toString());


        String jsonString = gson.toJson(collection);

        return jsonString;
    }

}
