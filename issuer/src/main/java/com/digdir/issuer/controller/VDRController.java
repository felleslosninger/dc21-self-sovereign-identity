package com.digdir.issuer.controller;

import com.digdir.issuer.service.VDRService;
import com.digdir.issuer.storage.FileHandler;
import com.digdir.issuer.storage.IssuerTypesHandler;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.NoSuchAlgorithmException;
import java.security.spec.InvalidKeySpecException;
import java.util.Base64;
import java.util.Collection;

@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "*", allowedHeaders = "*")
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
    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/vdr/key/{id}")
    public String getKey(@PathVariable String id) {
        FileHandler fileHandler = new FileHandler();
        try{
            return Base64.getEncoder().encodeToString(fileHandler.getPublicKey(id).getEncoded());
        }catch (Exception e){
            System.out.println("No key found.");
            return "No key found with this id";
        }
    }

    @Deprecated
    @GetMapping("/vdr/postKeyOld")
    public String postKey(@RequestParam(value = "id") String id, @RequestParam(value="key") String key) throws InvalidKeySpecException, NoSuchAlgorithmException {
        fileHandler.addPublicKey(id, vdrService.pemToKey(key));
        return "ok";
    }


    @PostMapping(value = "vdr/postKey")
    ResponseEntity<String> postKeyToVDR(@RequestBody String body, @RequestParam(value="userID")String userID) {
        System.out.println("something is working");
        System.out.println(body);
        fileHandler.addPublicKey(userID, vdrService.PEMtoRSAConverter(body));
        return new ResponseEntity<>("Hello overlord", HttpStatus.OK);
    }

    @GetMapping("/vdr/getTypes/{issuer}")
    public Collection<String> getTypesWithIssuer(@PathVariable String issuer){
        IssuerTypesHandler issuerTypesHandler = new IssuerTypesHandler();
        return issuerTypesHandler.getTypesWithIssuer(issuer);
    }
}
