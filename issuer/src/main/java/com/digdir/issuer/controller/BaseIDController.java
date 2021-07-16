package com.digdir.issuer.controller;

import com.digdir.issuer.service.VcService;
import net.glxn.qrgen.core.image.ImageType;
import net.glxn.qrgen.javase.QRCode;
import org.apache.commons.io.IOUtils;
import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.oidc.user.OidcUser;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import javax.imageio.ImageIO;
import javax.servlet.Servlet;
import javax.servlet.ServletContext;
import java.awt.*;
import java.awt.image.BufferedImage;
import java.io.*;

/**
 * Controller for BaseVC-operations
 */
@RestController
public class BaseIDController {
    VcService vcService = new VcService();

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
    public ResponseEntity<byte[]> getProtectedPage(@AuthenticationPrincipal OidcUser principal, Model model){
        String QR_TEXT = vcService.getBaseVC(principal);
        byte[] qrImage = vcService.generateByteArray(QR_TEXT);
        return ResponseEntity.ok().contentType(MediaType.IMAGE_PNG).body(qrImage);
    }



}
