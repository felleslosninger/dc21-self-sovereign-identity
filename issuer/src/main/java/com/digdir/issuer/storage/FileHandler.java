package com.digdir.issuer.storage;


import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.reflect.TypeToken;
import org.springframework.stereotype.Repository;

import java.io.*;
import java.nio.charset.StandardCharsets;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.security.KeyFactory;
import java.security.NoSuchAlgorithmException;
import java.security.PublicKey;
import java.security.spec.InvalidKeySpecException;
import java.security.spec.X509EncodedKeySpec;
import java.util.Base64;
import java.util.HashMap;
import java.util.Objects;

/**
 * Class as Repository for handling public keys in file.
 */
@Repository
public class FileHandler {


    //private String path = "issuer/src/main/resources/PublicKeyFile.json";
    private Path path = Paths.get("src/main/resources/PublicKeyFile.json"); //change this path to issuer/src/main/resources/PublicKeyFile.json if there is a problem with the path.
    private Writer file;

    /**
     * Method for adding a public key to VDR(PublicKeyFile.json).
     * Retrives existing map of PK's in file and appends PK.
     *
     * @param id id for identifying a public key to it's owner in VDR.
     * @param pk Public key to be saved to VDR.
     */
    public void addPublicKey(String id, PublicKey pk){
             HashMap<String, PublicKey> map = loadFromFile();
            map.put(id, pk);
            saveToFile(map);


    }

    /**
     * Method for retrieving a public key from VDR(PublicKeyFile.json)
     * @param id id for public key to retrive
     * @return Public Key with id as specified, if existing.
     */
    public PublicKey getPublicKey(String id){
        if (!Objects.requireNonNull(loadFromFile()).containsKey(id)) {
            throw new IllegalArgumentException("No such id");
        }
        return loadFromFile().get(id);
    }


    /**
     * Method for saving HashMap of id and PublicKey to file.
     * @param publicKeyMap HashMap to save.
     */
    private void saveToFile(HashMap<String, PublicKey> publicKeyMap) {
        Gson gson = new GsonBuilder().setPrettyPrinting().create();

        HashMap<String, String> map = new HashMap<>();
        publicKeyMap.forEach((key, value) -> map.put(key, Base64.getEncoder().encodeToString(value.getEncoded())));

        String javaObjectString = gson.toJson(map); // converts to json

        try {

            FileOutputStream fileStream = new FileOutputStream(path.toFile());
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


    /**
     * Loads existing HashMap of id and PublicKey from PublicKeyFile.json
     * @return HashMap of id and PublicKey
     */
    private HashMap<String, PublicKey> loadFromFile() {
        try {
            InputStream inputStream = new FileInputStream(path.toFile());
            Reader fileReader = new InputStreamReader(inputStream, StandardCharsets.UTF_8);
            HashMap<String, String> mapFromFile = new Gson().fromJson(fileReader, new TypeToken<HashMap<String, String>>() {
            }.getType());
            HashMap<String, PublicKey> publicKeyMap = new HashMap<>();
            mapFromFile.forEach((key, value) -> {
                try {
                    publicKeyMap.put(key, KeyFactory.getInstance("RSA").generatePublic(new X509EncodedKeySpec(Base64.getDecoder().decode(value))));
                } catch (InvalidKeySpecException | NoSuchAlgorithmException invalidKeySpecException) {
                    System.out.println("Problem in Filehandler. Cant load from file. ");
                }
            });
            return publicKeyMap;

        } catch (Exception e) {
            throw new NullPointerException("There was an error loading from file.");

        }

    }

    /**
     * Method for removing a public key from VDR(PublicKeyFile.json) with specific id.
     * @param id id for publuc key to remove
     */
    public void removeKeyByID(String id) {
        if(!loadFromFile().containsKey(id)) {
            throw new IllegalArgumentException("no such id, cannot remove");
        }
        HashMap<String, PublicKey> map = loadFromFile();
        map.remove(id);
        saveToFile(map);

    }

    // Used in test: -----------------------------------------------------------------------
    public String getPublicKeyAsString(String id){
        PublicKey pk = getPublicKey(id);
        byte[] jsonPk = pk.getEncoded();
        Gson gson = new Gson();
        return gson.toJson(jsonPk);
    }
    public void setPath(Path path){
        this.path = path;
    }

}
