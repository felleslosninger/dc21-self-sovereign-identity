package com.digdir.issuer.integrationtest;


import com.digdir.issuer.service.VcService;
import com.digdir.issuer.storage.FileHandler;
import com.digdir.issuer.util.KeyGenerator;
import com.google.gson.Gson;
import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import java.security.NoSuchAlgorithmException;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;


@SpringBootTest
@AutoConfigureMockMvc
@ExtendWith(SpringExtension.class)
public class ApplicationTest {

    @Autowired
    private WebApplicationContext applicationContext;

    @MockBean
    VcService vcService;

    private static FileHandler fileHandler;
    private static KeyGenerator keyGenerator;

    @Autowired
    private MockMvc mockMvc;

    @BeforeAll
    static void setupAll() throws NoSuchAlgorithmException {
        fileHandler = new FileHandler();
        keyGenerator = new KeyGenerator();
    }

    @BeforeEach
    void setup() {
        this.mockMvc = MockMvcBuilders
                .webAppContextSetup(applicationContext)
                .build();
    }


    @Test
    void getKeyFromVDR_ReturnsHttpStatusOk() throws Exception {
        mockMvc.perform(get("/vdr/key/issuer18beb8f7-1162-49fa-8521-fb19955a1f1f")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());

    }

    @Test
    void getKeyFromVDR_ReturnsPK() throws Exception {
        fileHandler.addPublicKey("testID", keyGenerator.getPublicKey());
        MvcResult result = mockMvc.perform(get(("/vdr/key/testID")))
                .andExpect(MockMvcResultMatchers.status().isOk()).andReturn();
        String resultString = result.getResponse().getContentAsString();
        byte[] jsonPk = keyGenerator.getPublicKey().getEncoded();
        Gson gson = new Gson();
        assertEquals(gson.toJson(jsonPk), resultString);
    }




    @Test
    void getVCWithTypeVDRReturnsHttpStatusOk() throws Exception {
        mockMvc.perform(get("/api/getVC?type=over-18&baseVC=eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiIwODA4OTQwOTM4MiIsImlzcyI6IkdydW5uSUQtcG9ydGFsZW4ubm82N2YwNTc1ZS1iMGJmLTQ3NmUtOTE2Mi02YzMyNWJlNGY1YjYiLCJleHAiOjE2MjczNzE1MDEsImlhdCI6MTYyNjE2MTkwMSwidmMiOnsiY3JlZGVudGlhbFN1YmplY3QiOnsiYmFzZWlkIjp7Im5hbWUiOiJCYXNlSUQiLCJ0eXBlIjoiQmFzZUlEIn19LCJ0eXBlIjpbIlZlcmlmaWFibGVDcmVkZW50aWFsIiwiQmFzZUNyZWRlbnRpYWwiXSwiQGNvbnRleHQiOlsiaHR0cHM6Ly93d3cudzMub3JnLzIwMTgvY3JlZGVudGlhbHMvdjEiXX0sImp0aSI6Imh0dHA6Ly9sb2NhbGhvc3Q6ODA4My9jcmVkZW50aWFscy8xIn0.d1peCPW4zPSxVgM9IBh3DRcsFD7hdKCeeCu4dKpxVNe55guFVr-gHjDK6J9328-Dl-PtRUJvf2d-zsnzw_elzPj5EsMB2SuFzYan-gTOcoc9KETaxVUnn2iFclPb28s_zqN0jryvy9FARDBwT9w3VfXyVaQavXAJoshsaBElvAMsVQgCxYvH6eSblCwfWoe01LBBOhJ35qUPnYGwg56BkEo2emypr5HeZOrKXeaoqyStROhKRhYdkcLGSGOWrgGwC2aniVDGq65vcblYQK8AnZkJJHhddc8hT88l_dr3inVfSVZKe6kV7VAvIEuhAR0zErM8BA3G0lIA-c6ex_NYbw").contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());

    }

    @AfterAll
    static void teardown(){
        fileHandler.removeKeyByID("testID");
    }

}
