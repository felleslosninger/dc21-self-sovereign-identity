package com.digdir.issuer.controller;

import com.digdir.issuer.service.VcService;
import com.digdir.issuer.storage.JwtTypeHandler;
import com.digdir.issuer.storage.FileHandler;
import org.apache.tomcat.util.codec.binary.Base64;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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

    /**
     * Route that handles issuance of certain VC, it requiers a valid baseVC to be input
     *
     * @param type   Type of credential, that is checked in the "database" if the type exists
     * @param baseVC The VC gotten from the baseId issuer by logging in through id-porten.
     * @return A VC in the format of a JWT, this is signed with issuer public key and can be verified by verifier by gettting that key from the VDR
     */
    @GetMapping("/api/getVC")
    public String getVC(@RequestParam(value = "type", defaultValue = "defaultType") String type, @RequestParam(value = "baseVC", defaultValue = "defaultVC") String baseVC) {
        return vcService.getVC(type, baseVC);
    }

    @GetMapping("/api/types")
    public Collection<String> getTypes() {
        JwtTypeHandler jth = new JwtTypeHandler();
        return jth.getTypes();

    }
}

