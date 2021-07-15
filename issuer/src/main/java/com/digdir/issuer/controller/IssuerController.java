package com.digdir.issuer.controller;

import com.digdir.issuer.service.VcService;
import com.digdir.issuer.storage.JwtTypeHandler;
import com.digdir.issuer.storage.FileHandler;
import org.apache.tomcat.util.codec.binary.Base64;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;


import java.net.URISyntaxException;

import java.util.Collection;
import java.security.KeyFactory;
import java.security.NoSuchAlgorithmException;
import java.security.PublicKey;
import java.security.interfaces.RSAPublicKey;
import java.security.spec.InvalidKeySpecException;
import java.security.spec.X509EncodedKeySpec;


@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequiredArgsConstructor
public class IssuerController {
    private final VcService vcService;

    /**
     * Route that handles issuance of certain VC, it requiers a valid baseVC to be input
     *
     * @param type Type of credential, that is checked in the "database" if the type exists
     * @param baseVC The VC gotten from the baseId issuer by logging in through id-porten.
     * @return A VC in the format of a JWT, this is signed with issuer public key and can be verified by verifier by gettting that key from the VDR
     * @throws URISyntaxException If the URI is of wrong format.
     */
    @GetMapping("/api/getVC")
    public String getVC(@RequestParam(value = "type", defaultValue = "defaultType") String type, @RequestParam(value = "baseVC", defaultValue = "defaultVC") String baseVC) throws URISyntaxException {
        return vcService.getVC(type, baseVC);
    }


    @GetMapping("/api/types")
    public Collection<String> getTypes(){
        JwtTypeHandler jth = new JwtTypeHandler();
        return jth.getTypes();
      
    @GetMapping("/vdr/postKey")
    public String postKey(@RequestParam(value = "id") String id, @RequestParam(value="key") String key) throws InvalidKeySpecException, NoSuchAlgorithmException {
        FileHandler fileHandler = new FileHandler();
        PublicKey pk = pemToKey(key);
        fileHandler.addPublicKey(id, pk);

        return "ok";


    }

    //
    private RSAPublicKey pemToKey(String key) throws InvalidKeySpecException, NoSuchAlgorithmException {
        String publicKeyPEM = key;
        publicKeyPEM = publicKeyPEM.replace(" ", "+");
        publicKeyPEM = publicKeyPEM.replace("-----BEGIN+PUBLIC+KEY-----", "");
        publicKeyPEM = publicKeyPEM.replace("-----END+PUBLIC+KEY-----", "");
        byte[] encoded = Base64.decodeBase64(publicKeyPEM);
        KeyFactory kf = KeyFactory.getInstance("RSA");
        RSAPublicKey pubKey = (RSAPublicKey) kf.generatePublic(new X509EncodedKeySpec(encoded));
        System.out.println(pubKey);
        return pubKey;

    }
}

