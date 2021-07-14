package com.digdir.issuer.controller;

import com.digdir.issuer.service.VDRService;
import com.digdir.issuer.storage.FileHandler;
import com.nimbusds.oauth2.sdk.http.HTTPResponse;
import lombok.RequiredArgsConstructor;
import org.apache.tomcat.util.codec.binary.Base64;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.lang.reflect.Member;
import java.security.KeyFactory;
import java.security.NoSuchAlgorithmException;
import java.security.PublicKey;
import java.security.cert.CertificateException;
import java.security.cert.CertificateFactory;
import java.security.interfaces.RSAPublicKey;
import java.security.spec.InvalidKeySpecException;
import java.security.spec.X509EncodedKeySpec;

@RestController
@RequiredArgsConstructor
public class VDRController {
    private final VDRService vdrService;
    private final FileHandler fileHandler;

    /**
     * Route to get a public key based on the issuer id.
     * This class should be in VDR
     *
     * @param id issuerId for a given signature to get the corresponding Public key.
     * @return Public RSA key in string format
     */
    @GetMapping("/vdr/key/{id}")
    public String getKey(@PathVariable String id) {
        FileHandler fileHandler = new FileHandler();
        try{
            System.out.println(fileHandler.getPublicKeyAsString(id));
            return fileHandler.getPublicKeyAsString(id);
        }catch (Exception e){
            System.out.println("No key found.");
            return "No key found with this id";
        }
    }


    @GetMapping("/vdr/postKey")
    public String postKey(@RequestParam(value = "id") String id, @RequestParam(value="key") String key) throws InvalidKeySpecException, NoSuchAlgorithmException {
        fileHandler.addPublicKey(id, vdrService.pemToKey(key));
        return "ok";
    }


    @PostMapping("/vdr/post/key")
    public ResponseEntity<HTTPResponse> postKeyToVDR(@RequestBody String body, @RequestParam(value="userID") String userID) {
        fileHandler.addPublicKey(userID, vdrService.PEMtoRSAConverter(body));
        return ResponseEntity.ok().build();
    }
}
