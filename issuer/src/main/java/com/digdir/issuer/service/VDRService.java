package com.digdir.issuer.service;

import org.apache.tomcat.util.codec.binary.Base64;
import org.springframework.stereotype.Service;

import java.security.KeyFactory;
import java.security.NoSuchAlgorithmException;
import java.security.interfaces.RSAPublicKey;
import java.security.spec.InvalidKeySpecException;
import java.security.spec.X509EncodedKeySpec;

@Service
public class VDRService {

    /**
     * Service that converts a pem formatted key into an RSAPublicKey object to be used by POJO.
     * @param publicKeyInPEMFormat is a string intended to be sent by wallet application.
     * @return an RSA Public key to be used in the vdr.
     */
    public RSAPublicKey PEMtoRSAConverter(String publicKeyInPEMFormat) {
        //Remove being and end and linebreak to sanitize
        String publicKeyString = publicKeyInPEMFormat.replace("\\n","").replace("-----BEGIN PUBLIC KEY-----","").replace("-----END PUBLIC KEY-----","");
        byte[] encodedPKey = Base64.decodeBase64(publicKeyString);
        // Convert from encoded to actual public key.
        KeyFactory keyFactory = null;
        try {
            keyFactory = KeyFactory.getInstance("RSA");
        } catch (NoSuchAlgorithmException e) {
            System.out.println("Unable to create keyfactory object in VDRService service file");
        }
        RSAPublicKey rsaPublicKey = null;
        try {
            assert keyFactory != null;
            rsaPublicKey = (RSAPublicKey) keyFactory.generatePublic(new X509EncodedKeySpec(encodedPKey));
        } catch (InvalidKeySpecException e) {
            System.out.println("Unable to create key due to invalid key spec.");
        }
        return rsaPublicKey;
    }

}
