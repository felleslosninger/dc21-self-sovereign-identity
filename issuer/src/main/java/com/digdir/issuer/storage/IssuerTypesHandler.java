package com.digdir.issuer.storage;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;

import java.io.FileInputStream;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.Reader;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

/**
 * Class that reads from file the available issuers and their available VC-types
 */
public class IssuerTypesHandler {
  
    private static String path = "src/main/resources/IssuerTypes.json";  //change this path to issuer/src/main/resources/IssuerTypes.json if there is a problem with the path.
  
    public static void main(String[] args) {
        IssuerTypesHandler ith = new IssuerTypesHandler();
        System.out.println(ith.getAllIssuers());
    }

    /**
     * Loads from file the VC types that the given issuer can construct
     * @param issuer = the issuer
     * @return a list of the VC types
     */
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


    /**
     * Loads from file all the available issuers
     * @return a list of the issuers
     */
    public List<String> getAllIssuers(){
        List<String> allIssuers = new ArrayList<>();
        try {
            InputStream inputStream = new FileInputStream(path);
            Reader fileReader = new InputStreamReader(inputStream, StandardCharsets.UTF_8);
            HashMap<String, List<String>> mapFromFile = new Gson().fromJson(fileReader, new TypeToken<HashMap<String, List<String>>>() {
            }.getType());
            for ( String key : mapFromFile.keySet() ) {
                allIssuers.add(key);
            }
            return allIssuers;

        }catch (Exception e){
            throw new NullPointerException("Error with reading from IssuerTypes.json");
        }
    }
}
