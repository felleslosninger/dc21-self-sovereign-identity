package com.example.issuer;


import com.google.gson.Gson;

import com.google.gson.reflect.TypeToken;

import java.io.*;
import java.net.ServerSocket;
import java.nio.charset.StandardCharsets;
import java.security.KeyFactory;
import java.security.KeyPairGenerator;
import java.security.NoSuchAlgorithmException;
import java.security.PublicKey;
import java.security.spec.InvalidKeySpecException;
import java.security.spec.X509EncodedKeySpec;
import java.util.HashMap;
import java.util.Objects;

/**
 * Class that reads and writes public keys from and to file
 */
public class FileHandler {

    /**
     * The path to the file that contains the available jwt types
     */
    private String path = "src/main/resources/testFile.json";


    /**
     * Saves to file a hashmap that maps IDs to corresponding public keys
     * @param publicKeyMap = the map to save to file
     */
    private void saveToFile(HashMap<String, PublicKey> publicKeyMap) {
        Gson gson = new Gson();

        HashMap<String, byte[]> map = new HashMap<>();
        publicKeyMap.forEach((key, value) -> map.put(key, value.getEncoded()));

        String javaObjectString = gson.toJson(map); // converts to json

        try {

            FileOutputStream fileStream = new FileOutputStream(path);
            Writer file = new OutputStreamWriter(fileStream, StandardCharsets.UTF_8);
            file.write(javaObjectString);
            file.flush();
            file.close();

        } catch (IOException e) {
            System.out.println("an error occurred when writing to file");
        }

    }

    /**
     * Loads from file IDs and their corresponding public keys
     * @return the hashmap mapping the IDs to corresponding public keys
     */
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
                } catch (InvalidKeySpecException | NoSuchAlgorithmException e) {
                    throw new RuntimeException("an error occurred when reading keys from file");
                }
            });
            return publicKeyMap;

        } catch (FileNotFoundException e) {
            System.out.println("no such file");
            return null;
        }
    }

    /**
     * Gets the public key of a given holder
     * @param id = the id of the holder we wish to get the public key of
     * @return the public key of the holder
     */
    public PublicKey getPublicKey(String id){
        if (!Objects.requireNonNull(loadFromFile()).containsKey(id)) {
            throw new IllegalArgumentException("No such id");
        }
        return loadFromFile().get(id);
    }


    /**
     * Gets the public key of a given holder as a string
     * @param id = the id of the holder we wish to get the public key of
     * @return the public key of the holder as a string
     */
    public String getPublicKeyAsString(String id){
        PublicKey pk = getPublicKey(id);
        byte[] jsonPk = pk.getEncoded();
        Gson gson = new Gson();
        return gson.toJson(jsonPk);
    }


    /**
     * Adds a mapping of a holder and a public key to the file
     * @param id = the id of the holder
     * @param pk = the public key of the holder
     * @throws IllegalArgumentException if the holder id already exists in the file
     */
    public void addPublicKey(String id, PublicKey pk){
        if(loadFromFile().containsKey(id)) {
            throw new IllegalArgumentException("id already exists");
        }
        HashMap<String, PublicKey> map = loadFromFile();
        map.put(id, pk);
        saveToFile(map);
    }

    /**
     * Removes a mapping of a holder from the file
     * @param id = the id of the holder
     * @throws IllegalArgumentException if the holder id doesn't exist in the file
     */
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
