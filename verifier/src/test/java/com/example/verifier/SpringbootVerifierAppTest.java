package com.example.verifier;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import static org.junit.jupiter.api.Assertions.*;

@AutoConfigureMockMvc
@WebMvcTest
class SpringbootVerifierAppTest {

    @Autowired
    private MockMvc mockMvc;

    private final ObjectMapper objectMapper = new ObjectMapper();
    private final String baseURL = "http://localhost:8080";

    private String addToBaseURL(String path) {
        return baseURL + "/" + path;
    }

    @Test
    public void testGet_hello() throws Exception {
        MvcResult result = mockMvc.perform(MockMvcRequestBuilders.get(addToBaseURL("api/hello")))
                .andExpect(MockMvcResultMatchers.status().isOk()).andReturn();
        String resultString = result.getResponse().getContentAsString();
        assertEquals("Hello World!", resultString);

    }

   @Test
    public void testGet_verify() throws Exception {

        MvcResult result = mockMvc.perform(MockMvcRequestBuilders.get(addToBaseURL("api/checkVerified")))
                .andExpect(MockMvcResultMatchers.status().isOk()).andReturn();
        try {
            objectMapper.readValue(result.getResponse().getContentAsString(), boolean.class);
        } catch (JsonProcessingException e) {
            fail(e.getMessage());
        }


    }

}