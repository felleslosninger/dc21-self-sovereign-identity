package com.example.verifier.verification;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.reflect.TypeToken;

import java.io.*;
import java.nio.charset.StandardCharsets;
import java.security.KeyFactory;
import java.security.NoSuchAlgorithmException;
import java.security.PublicKey;
import java.security.spec.InvalidKeySpecException;
import java.security.spec.X509EncodedKeySpec;
import java.util.Base64;
import java.util.HashMap;
import java.util.Map;
import java.util.Scanner;
import java.util.function.BiConsumer;
import java.util.function.BooleanSupplier;

public class UserIdHandler {
    private Writer file;

    //sjekke at ID finnes, les fra fil
    private boolean getUserExists(String id) {
        try {
            File file = new File("src/main/resources/userID.json");
            Scanner scanner = new Scanner(file);

            while (scanner.hasNextLine()) {
                String line = scanner.nextLine();
                String[] parts = line.split(":");
                if (parts[0].equals(id)) {
                    scanner.close();
                    return true;
                }
            }
            scanner.close();

        } catch (FileNotFoundException e) {
            System.out.println("file "+ " was not found");
        }
        return false;
    }

    public HashMap<String, Boolean> loadFromFile() {
        try {
            InputStream inputStream = new FileInputStream("src/main/resources/userID.json");
            Reader fileReader = new InputStreamReader(inputStream, StandardCharsets.UTF_8);
            HashMap<String, Boolean> userIDMap = new HashMap<>();

            HashMap<String, Boolean> mapFromFile = new Gson().fromJson(fileReader, userIDMap.getClass());
            mapFromFile.forEach((key, value) -> {
                userIDMap.put(key, value);
            });
            return userIDMap;

        } catch (Exception e) {
            throw new NullPointerException("There was an error loading from file.");

        }

    }

    //skrive  til fil

    private void saveToFile(HashMap<String, Boolean> userIDMap) {
        Gson gson = new GsonBuilder().setPrettyPrinting().create();

        HashMap<String, Boolean> map = new HashMap<>();
        userIDMap.forEach((key, value) -> map.put(key, value));

        String javaObjectString = gson.toJson(map); // converts to json

        try {

            FileOutputStream fileStream = new FileOutputStream("src/main/resources/userID.json");
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
    //legg til bruker, userID: false
    public void addUserId(String id, boolean verified) {
        HashMap<String, Boolean> map = loadFromFile();
        map.put(id, verified);
        saveToFile(map);
    }

    //getIsUserVerified(id) return true/false, kalle i checkVerified
    public boolean getIsUserVerified(String id) {
        if (loadFromFile().get(id).equals(true)) {
            return true;
        } return false;
    }


    public static void main(String[] args) {
        UserIdHandler uih = new UserIdHandler();
        uih.addUserId("gunvor", false);
        uih.addUserId("Ingunn", true);
        uih.getIsUserVerified("Ingunn");
        uih.getIsUserVerified("gunvor");
    }
}
