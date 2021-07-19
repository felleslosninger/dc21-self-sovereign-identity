package com.digdir.issuer.storage;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;

import java.io.FileInputStream;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.Reader;
import java.nio.charset.StandardCharsets;
import java.util.HashMap;
import java.util.List;


public class IssuerTypesHandler {
    private static String path = "issuer/src/main/resources/IssuerTypes.json";


    public IssuerTypesHandler() {
    }

    public static void main(String[] args) {
        IssuerTypesHandler ith = new IssuerTypesHandler();
        System.out.println(ith.getTypesWithIssuer("utsteder2"));
    }

    public List<String> getTypesWithIssuer(String issuer){
        try {
            InputStream inputStream = new FileInputStream(path);
            Reader fileReader = new InputStreamReader(inputStream, StandardCharsets.UTF_8);
            HashMap<String, List<String>> mapFromFile = new Gson().fromJson(fileReader, new TypeToken<HashMap<String, List<String>>>() {
            }.getType());
            if(mapFromFile.get(issuer) != null){
                return mapFromFile.get(issuer);
            }
            return null;

        }catch (Exception e){
            throw new NullPointerException("Error with reading from IssuerTypes.json");
        }
    }
}
