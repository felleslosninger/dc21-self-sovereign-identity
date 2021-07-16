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
     * Route that redirects to id-porten and after user login gets an id-porten token.
     * Token is used to issue a baseId, that is signed to be used and verified by other issuers.
     *
     * @param principal id-token object
     * @param model TODO What is model?
     * @return baseId token in the format of a jwt-String
     * @throws Exception If the input to JWT is wrong, a multitude of exceptions can be thrown :)
     */

    @Autowired
    private ServletContext servletContext;

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/protectedpage")
    public ResponseEntity<QRCode> getProtectedPage(@AuthenticationPrincipal OidcUser principal, Model model) throws Exception {
        /*
        HttpHeaders headers = new HttpHeaders();

        ServletContext servletContext = null;

        byte[] media = IOUtils.toByteArray(in);
        headers.setCacheControl(CacheControl.noCache().getHeaderValue());
        ResponseEntity<byte[]> responseEntity = new ResponseEntity<>(media, headers, HttpStatus.OK);
        return responseEntity;

         */
        String value = vcService.getBaseVC(principal);
        //ByteArrayOutputStream stream = QRCode.from(value).to(ImageType.PNG).stream();

     //   InputStream in = new ByteArrayInputStream(stream.toByteArray());

        //Image bi = ImageIO.read(in);
QRCode qrCode = QRCode.from(value).to(ImageType.PNG);
        return ResponseEntity.ok().header("Content-type", "image/svg+xml").body(qrCode);

        //ByteArrayInputStream in = new ByteArrayInputStream(QRCode.from(value).stream().toByteArray());
        //return ImageIO.read(in);
    }

}
