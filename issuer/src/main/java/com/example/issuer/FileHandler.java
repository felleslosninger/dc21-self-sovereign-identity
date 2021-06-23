package com.example.issuer;


import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.reflect.TypeToken;

import java.io.*;
import java.security.KeyFactory;
import java.security.KeyPairGenerator;
import java.security.NoSuchAlgorithmException;
import java.security.PublicKey;
import java.security.spec.InvalidKeySpecException;
import java.security.spec.X509EncodedKeySpec;
import java.util.HashMap;
import java.util.Map;

public class FileHandler {

    private String path = "src/main/resources/testFile.json";
    private Writer file;



    private void saveToFile(HashMap<String, PublicKey> publicKeyMap) {
        Gson gson = new Gson();

        HashMap<String, byte[]> map = new HashMap<>();
        publicKeyMap.entrySet().stream().forEach(s -> map.put(s.getKey(), s.getValue().getEncoded()));

        String javaObjectString = gson.toJson(map); // converts to json

        try {

            FileOutputStream fileStream = new FileOutputStream(path);
            file = new OutputStreamWriter(fileStream, "UTF-8");
            file.write(javaObjectString);

        } catch (IOException e) {
            e.printStackTrace();
        } finally {

            try {
                file.flush();
                file.close();
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }

    private HashMap<String, PublicKey> loadFromFile() {
        try {
            InputStream inputStream = new FileInputStream(path);
            Reader fileReader = new InputStreamReader(inputStream, "UTF-8");
            HashMap<String, byte[]> mapFromFile = new Gson().fromJson(fileReader, new TypeToken<HashMap<String, byte[]>>() {
            }.getType());
            HashMap<String, PublicKey> publicKeyMap = new HashMap<>();
            mapFromFile.entrySet().stream().forEach(e -> {
                try {
                    publicKeyMap.put(e.getKey(),  KeyFactory.getInstance("RSA").generatePublic(new X509EncodedKeySpec(e.getValue())));
                } catch (InvalidKeySpecException invalidKeySpecException) {
                    invalidKeySpecException.printStackTrace();
                } catch (NoSuchAlgorithmException noSuchAlgorithmException) {
                    noSuchAlgorithmException.printStackTrace();
                }
            });
            return publicKeyMap;

        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }

    }

    public PublicKey getPublicKey(String id){
        HashMap<String, PublicKey> map = loadFromFile();
        return map.get(id);
    }

    public String getPublicKeyAsString(String id){
        PublicKey pk = getPublicKey(id);
        byte[] jsonPk = pk.getEncoded();
        Gson gson = new Gson();
        String jsonString = gson.toJson(jsonPk);
        return jsonString;
    }

    public void addPublicKey(String id, PublicKey pk){
        HashMap<String, PublicKey> map = loadFromFile();
        map.put(id, pk);
        saveToFile(map);
    }

    public static void main(String[] args) throws NoSuchAlgorithmException {
        KeyPairGenerator kpg1 = KeyPairGenerator.getInstance("RSA");
        /*
        HashMap<String, PublicKey> map = new HashMap<>();
        map.put("id1", kpg1.generateKeyPair().getPublic());
        map.put("id2", kpg1.generateKeyPair().getPublic());

         */

        FileHandler fh = new FileHandler();
        HashMap<String, PublicKey> map = new HashMap<>();
        map =  fh.loadFromFile();
        map.put("id1", kpg1.generateKeyPair().getPublic());

        fh.saveToFile(map);
        HashMap<String, PublicKey> newMap = fh.loadFromFile();
        System.out.println(newMap.get("id1").getClass());

    }

    public void setPath(String path){
        this.path = path;
    }

}
