package com.digdir.issuer.storage;


import com.google.gson.Gson;

import com.google.gson.reflect.TypeToken;

import java.io.*;
import java.nio.charset.StandardCharsets;
import java.security.KeyFactory;
import java.security.KeyPairGenerator;
import java.security.NoSuchAlgorithmException;
import java.security.PublicKey;
import java.security.spec.InvalidKeySpecException;
import java.security.spec.X509EncodedKeySpec;
import java.util.HashMap;
import java.util.Objects;


public class FileHandler {

    private String path = "src/main/resources/PublicKeyFile.json";
    private Writer file;



    private void saveToFile(HashMap<String, PublicKey> publicKeyMap) {
        Gson gson = new Gson();

        HashMap<String, byte[]> map = new HashMap<>();
        publicKeyMap.forEach((key, value) -> map.put(key, value.getEncoded()));

        String javaObjectString = gson.toJson(map); // converts to json

        try {

            FileOutputStream fileStream = new FileOutputStream(path);
            file = new OutputStreamWriter(fileStream, StandardCharsets.UTF_8);
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
            Reader fileReader = new InputStreamReader(inputStream, StandardCharsets.UTF_8);
            HashMap<String, byte[]> mapFromFile = new Gson().fromJson(fileReader, new TypeToken<HashMap<String, byte[]>>() {
            }.getType());
            HashMap<String, PublicKey> publicKeyMap = new HashMap<>();
            mapFromFile.forEach((key, value) -> {
                try {
                    publicKeyMap.put(key, KeyFactory.getInstance("RSA").generatePublic(new X509EncodedKeySpec(value)));
                } catch (InvalidKeySpecException | NoSuchAlgorithmException invalidKeySpecException) {
                    invalidKeySpecException.printStackTrace();
                }
            });
            return publicKeyMap;

        } catch (Exception e) {
            throw new NullPointerException("There was an error loading from file.");

        }

    }

    public PublicKey getPublicKey(String id){
        if (!Objects.requireNonNull(loadFromFile()).containsKey(id)) {
            throw new IllegalArgumentException("No such id");
        }
        return loadFromFile().get(id);
    }

    public String getPublicKeyAsString(String id){
        PublicKey pk = getPublicKey(id);
        byte[] jsonPk = pk.getEncoded();
        Gson gson = new Gson();
        return gson.toJson(jsonPk);
    }

    public void addPublicKey(String id, PublicKey pk){
        if(loadFromFile().containsKey(id)) {
            throw new IllegalArgumentException("id already exists");
        }
        HashMap<String, PublicKey> map = loadFromFile();
        map.put(id, pk);
        saveToFile(map);
    }

    public void removeKeyByID(String id) {
        if(!loadFromFile().containsKey(id)) {
            throw new IllegalArgumentException("no such id, cannot remove");
        }
        HashMap<String, PublicKey> map = loadFromFile();
        map.remove(id);
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
        HashMap<String, PublicKey> map;
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
