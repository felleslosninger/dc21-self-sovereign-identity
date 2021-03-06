package com.digdir.issuer.controller;

import com.digdir.issuer.service.VcService;
import org.springframework.http.*;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.oidc.user.OidcUser;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;


/**
 * Controller for BaseVC-operations
 */
@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class BaseIDController {
    private final VcService vcService;

    /**
     * Route that redirects to id-porten and after user login gets an id-porten token through a QR-code.
     * Token is used to issue a baseId, that is signed to be used and verified by other issuers.
     *
     * @param principal id-token object
     * @param model TODO What is model?
     * @return a QR-code containing the baseId token in the format of a jwt-String
     */

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/protectedpage")
    public ResponseEntity<byte[]> getProtectedPage(@AuthenticationPrincipal OidcUser principal, Model model) {
        String QR_TEXT = vcService.getBaseVC(principal);
        byte[] qrImage = vcService.generateByteArray(QR_TEXT);
        return ResponseEntity.ok().contentType(MediaType.IMAGE_PNG).body(qrImage);
    }

}
