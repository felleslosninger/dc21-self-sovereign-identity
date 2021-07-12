package com.digdir.issuer.storage;
import org.springframework.stereotype.Repository;

import java.io.*;
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
@Repository
public class JwtTypeHandler {


    private final String path = "src/main/resources/JwtTypes.txt";


    /**
     * Method retrives typenames for a specific VC-type.
     * @param type type of VC.
     * @return Map of typenames
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

        } catch (Exception e) {
            e.printStackTrace();
        }
    return typeMap;
    }

    /**
     *
     * @return All available types of VC
     */
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

        } catch (Exception e) {
            e.printStackTrace();
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
