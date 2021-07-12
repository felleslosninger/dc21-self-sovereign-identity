package com.digdir.issuer.controller;

import com.digdir.issuer.jwt.Jwt;
import com.digdir.issuer.service.VcService;
import com.digdir.issuer.storage.FileHandler;
import com.digdir.issuer.storage.JwtTypeHandler;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;

import java.net.URISyntaxException;

@Controller
public class issuerApi {
    VcService vcService = new VcService();


    /**
     * Route to get a public key based on the issuer id.
     * This class should be in VDR
     *
     * @param id issuerId for a given signature to get the corresponding Public key.
     * @return Public RSA key in string format
     */
    @GetMapping("/api/key/{id}")
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
}
