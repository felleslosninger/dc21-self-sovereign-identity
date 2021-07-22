package com.example.verifier.verification;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileWriter;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import java.util.Scanner;
import java.util.function.BooleanSupplier;

public class UserIdHandler {
    //sjekke at ID finnes, les fra fil
    private Boolean getUserExists(String id) {
        try {
            File file = new File("src/main/resources/userID.txt");
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

    //skrive  til fil
    public void saveUserID(String id) throws IOException {
        try{
            FileWriter fw = new FileWriter("src/main/resources/userID.txt");
            fw.write(id + ":false");
        } catch (FileNotFoundException e) {
            System.out.println("file "+ " was not found");
        }



    }
    //legg til bruker, userID: false

    //getIsUserVerified(id) return true/false, kalle i checkVerified
}
