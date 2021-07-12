package com.digdir.issuer.controller;

import com.digdir.issuer.jwt.Jwt;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.oidc.user.OidcUser;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class gunnidApi {
    /**
     * Route that redirects to id-porten and after user login gets an id-porten token.
     * Token is used to issue a baseId, that is signed to be used and verified by other issuers.
     *
     * @param principal id-token object
     * @param model TODO What is model?
     * @return baseId token in the format of a jwt-String
     * @throws Exception If the input to JWT is wrong, a multitude of exceptions can be thrown :)
     */
    @GetMapping("/protective")
    public String getProtectedPage(@AuthenticationPrincipal OidcUser principal, Model model) throws Exception {
        Jwt jwt = new Jwt(principal.getClaim("pid").toString(), "GrunnID-portalen.no", "BaseCredential", "baseid", "BaseID", "BaseID");
        System.out.println("ID-PORTEN TOKEN:   " + principal.getIdToken().getTokenValue());
        System.out.println(model.toString());
        return jwt.getToken();
    }
}
