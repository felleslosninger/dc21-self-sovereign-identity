package com.example.issuer;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import org.apache.catalina.connector.Response;

import java.io.*;
import java.lang.reflect.Array;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.Map;
import java.util.Scanner;

public class JsonHandler {
   // public KeySaver keySaver;
   private static FileWriter file;
   private static JsonParser parser;

    public JsonHandler(){

    }


    public void saveKeysaverToJson(KeySaver keySaver){
        ArrayList<KeySaver> list = new ArrayList<>();
        Gson gson = new Gson();
        try {


        // create a reader
        Reader reader = null;

        reader = Files.newBufferedReader(Path.of("C:\\Users\\camp-jhv\\IdeaProjects\\digdir-camp-2021-VC\\issuer\\src\\main\\resources\\IssuerPK.json"));

        //list = gson.fromJson(reader, ArrayList.class);
        KeySaver keySaverTest = gson.fromJson(reader, KeySaver.class);
        System.out.println(keySaverTest.id);
        //list.forEach(x -> System.out.println(x));

        } catch (IOException e) {
            e.printStackTrace();
        }

        // convert JSON file to map



        String json = gson.toJson(keySaver);

        try {

            // Constructs a FileWriter given a file name, using the platform's default charset
            file = new FileWriter("C:\\Users\\camp-jhv\\IdeaProjects\\digdir-camp-2021-VC\\issuer\\src\\main\\resources\\IssuerPK.json", true);
            file.append(json);



        } catch (IOException e) {
            e.printStackTrace();

        } finally {

            try {
                file.flush();
                file.close();
            } catch (IOException e) {
                // TODO Auto-generated catch block
                e.printStackTrace();
            }
        }









    }


}
