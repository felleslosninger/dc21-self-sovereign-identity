package com.example.verifier.verification;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

import java.io.*;
import java.nio.charset.StandardCharsets;
import java.util.HashMap;
import java.util.Scanner;


/**
 * Class that reads and writes userID's from file
 */
public class UserIdHandler {
    private Writer file;

    /**
     * Method that checks if userID exists in file
     * @param id = the id we wish to find
     * @return a boolean value for if the id exists or not
     */
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

    /**
     * Loads from file the userID and a corresponding boolean value for if the user was verified or not
     * @return a hashmap mapping userIDs to a boolean value
     */
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

    /**
     * Saves to file a hashmap that maps userIDs to corresponding boolean values
     * @param userIDMap = the map to save to file
     */
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

    /**
     * Adds a mapping of a userID with a corresponding boolean value
     * @param id = the userID
     * @param verified = boolean value for if the user is verified or not
     */
    public void addUserId(String id, boolean verified) {
        HashMap<String, Boolean> map = loadFromFile();
        map.put(id, verified);
        saveToFile(map);
    }

    /**
     * Method that checks if a userID is verified or not
     * @param id = the userID
     * @return a boolean value that tells if the given userID is verified or not
     */
    public boolean getIsUserVerified(String id) {
        if (loadFromFile().get(id) == null) {
            return false;
        }
        else if (loadFromFile().get(id).equals(true)) {
            System.out.println("true");
            return true;
        }
        return false;
    }


    public static void main(String[] args) {
        UserIdHandler uih = new UserIdHandler();
        uih.addUserId("gunvor", false);
        uih.addUserId("Ingunn", true);
        uih.getIsUserVerified("Ingunn");
        uih.getIsUserVerified("gunvor");
    }
}
