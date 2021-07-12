package com.digdir.issuer.controller;

import com.digdir.issuer.service.VcService;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.oidc.user.OidcUser;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class GrunnidApi {
    VcService vcService = new VcService();

    /**
     * Route that redirects to id-porten and after user login gets an id-porten token.
     * Token is used to issue a baseId, that is signed to be used and verified by other issuers.
     *
     * @param principal id-token object
     * @param model TODO What is model?
     * @return baseId token in the format of a jwt-String
     * @throws Exception If the input to JWT is wrong, a multitude of exceptions can be thrown :)
     */
    @GetMapping("/protectedpage")
    public String getProtectedPage(@AuthenticationPrincipal OidcUser principal, Model model) throws Exception {
        return vcService.getBaseVC(principal);
    }


}
