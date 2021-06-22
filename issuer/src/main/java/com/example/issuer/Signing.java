package com.example.issuer;

import com.google.gson.Gson;

import javax.crypto.BadPaddingException;
import javax.crypto.Cipher;
import javax.crypto.IllegalBlockSizeException;
import javax.crypto.NoSuchPaddingException;
import javax.sql.rowset.serial.SerialStruct;
import java.nio.file.Files;
import java.security.InvalidKeyException;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.security.PrivateKey;

public class Signing {
    private byte[] signature;

    public Signing(PrivateKey privateKey, Credential message) throws NoSuchAlgorithmException, NoSuchPaddingException, InvalidKeyException, IllegalBlockSizeException, BadPaddingException {
        byte[] messageBytes = message.stringifier().getBytes();
        MessageDigest md = MessageDigest.getInstance("SHA-256");
        byte[] messageHash = md.digest(messageBytes);

        Cipher cipher = Cipher.getInstance("RSA");
        cipher.init(Cipher.ENCRYPT_MODE, privateKey);
        //byte[] digitalSignature = cipher.doFinal(messageHash);
        byte[] digitalSignature = cipher.doFinal(messageBytes);

        this.signature = digitalSignature;
    }

    public byte[] getSignature(){
        return this.signature;
    }


    public String getSignatureAsString() {
        Gson gson = new Gson();
        String jsonString = gson.toJson(this.signature);
        return jsonString;
    }


}
