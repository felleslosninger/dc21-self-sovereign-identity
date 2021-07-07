package com.example.verifier;

import java.io.File;
import java.io.FileNotFoundException;
import java.util.*;

/**
 *
 *     - Class for mapping types for VCs from file
 *     - For example for the requested type "over-18",
 *       the corresponding vcType, claimType and name can be mapped
 *     - The class is used for parsing the correct params for Jwt constructor based on the requested type
 *
 *     file format:
 *
 *     over-18:AgeCredential:age:Over 18
 *     er-sykepleier:DegreeCredential:degree:Er sykepleier
 *     ...
 *
 *     - temporary solution for PoC
 *     - there should be a better implementation for mapping types...
 *
 */
public class JwtTypeHandler {


    /**
     * The path to the file that contains the available jwt types
     */
    private final String path = "erifier/src/main/resources/JwtTypes.txt";


    /**
     * Method that gets the
     * @param type
     * @return
     */
    private Map<String, String> getType(String type) {
        Map<String, String> typeMap = new HashMap<>();
        try {

            File file = new File(path);
            Scanner scanner = new Scanner(file);

            while (scanner.hasNextLine()) {
                String line = scanner.nextLine();
                String[] parts = line.split(":");
                if (parts[0].equals(type)) {
                    typeMap.put("type", parts[0]);
                    typeMap.put("vcType", parts[1]);
                    typeMap.put("claimType", parts[2]);
                    typeMap.put("name", parts[3]);
                }
            }
            scanner.close();

        } catch (FileNotFoundException e) {
            System.out.println("file "+ " was not found");
        }
    return typeMap;
    }

    public Collection<String> getTypes() {
        Collection<String> types = new ArrayList<>();
        try {

            File file = new File(path);
            Scanner scanner = new Scanner(file);

            while (scanner.hasNextLine()) {
                String line = scanner.nextLine();
                String[] parts = line.split(":");
               types.add(parts[0]);
            }
            scanner.close();

        } catch (FileNotFoundException e) {
            System.out.println("file "+ " was not found");
        }

        return types;
    }


    public String getVcType(String type) {
        return getType(type).get("vcType");
    }

    public String getClaimType(String type) {
        return getType(type).get("claimType");
    }

    public String getName(String type) {
        return getType(type).get("name");
    }



    public static void main(String[] args) {
        JwtTypeHandler jth = new JwtTypeHandler();
        System.out.println(jth.getType("over-18"));
        System.out.println(jth.getVcType("over-18"));
        System.out.println(jth.getClaimType("er-sykepleier"));


    }


}
