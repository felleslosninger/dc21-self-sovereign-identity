package com.digdir.issuer.controller;

import com.digdir.issuer.service.VcService;
import com.digdir.issuer.storage.IssuerTypesHandler;
import com.digdir.issuer.storage.JwtTypeHandler;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Collection;

@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class IssuerController {
    private final VcService vcService;
    private final IssuerTypesHandler issuerTypesHandler;

    /**
     * Route that handles issuance of certain VC, it requires a valid baseVC to be input
     *
     * @param type   Type of credential, that is checked in the "database" if the type exists
     * @param baseVC The VC gotten from the baseId issuer by logging in through id-porten.
     * @param issuer The issuer, if valid issuer exists.
     * @return A VC in the format of a JWT, this is signed with issuer public key and can be verified by verifier by getting that key from the VDR
     */
    @GetMapping("/api/getVC")
    public String getVCOverload(@RequestParam(value = "type", defaultValue = "defaultType") String type, @RequestParam(value = "baseVC", defaultValue = "defaultVC") String baseVC, @RequestParam(value = "issuer", defaultValue = "defaultIss") String issuer) {
        if (issuer.equals("defaultIss")){
            return "No issuer input";
        }
        if (issuerTypesHandler.getTypesWithIssuer(issuer) == null) {
            return "No issuer exists for this VC";
        }
        //TODO: Add type check
        return vcService.getVC(type, baseVC, issuer);
    }

    /**
     * Endpoint that returns all types one can get from an issuer, atm ther is only one issuer...but you get the point
     * @return returns all types from this issuer
     */
    @GetMapping("/api/types")
    public Collection<String> getTypes() {
        JwtTypeHandler jth = new JwtTypeHandler();
        return jth.getTypes();

    }
}

