package com.digdir.issuer.controller;

import com.digdir.issuer.service.VcService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.net.URISyntaxException;

@RestController
public class IssuerController {
    VcService vcService = new VcService();

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
