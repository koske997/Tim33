package com.example.demo.controller;

import com.example.demo.model.Checkup;
import com.example.demo.model.Request;
import com.example.demo.service.CheckupService;
import com.example.demo.service.RequestService;
import com.example.demo.view.CheckupView;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;

import static com.example.demo.constants.DatabaseConstants.*;
import static org.junit.Assert.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@RunWith(SpringRunner.class)
@SpringBootTest
@AutoConfigureMockMvc
public class AKlinikeControllerIntegrationTest {

    @Autowired
    private MockMvc mvc;

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Autowired
    private CheckupService checkupService;

    private final String URL="http://localhost:3000";

    @Before
    public void setup() {

    }

    @Test
    public void podesiPregled() throws Exception {
        CheckupView checkupView = new CheckupView();
        checkupView.setTip(""+ID_UNAPRED_DEF);
        checkupView.setSala(""+PACIJENT_ID);

        ObjectMapper mapper = new ObjectMapper();
        mvc.perform(post(URL+"/podesiPregled")
                .contentType(MediaType.APPLICATION_JSON)
                .content(mapper.writeValueAsString(checkupView)))
                .andExpect(status().isOk());

        Checkup c = this.checkupService.findOne(Long.valueOf(ID_UNAPRED_DEF));

        assertEquals(c.getIdPacijenta(),PACIJENT_ID);


    }
}