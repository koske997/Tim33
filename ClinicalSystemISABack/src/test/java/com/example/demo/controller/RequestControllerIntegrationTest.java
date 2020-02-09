package com.example.demo.controller;

import com.example.demo.model.Request;
import com.example.demo.service.RequestService;
import com.example.demo.view.RequestView;
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
public class RequestControllerIntegrationTest {

    @Autowired
    private MockMvc mvc;

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Autowired
    private RequestService requestService;

    private final String URL="http://localhost:3000";

    @Before
    public void setup() {

    }

    @Test
    public void zahtevSestre() throws Exception {
        RequestView requestView = new RequestView();
        requestView.setDatum(DB_DATUM);
        requestView.setAdminId(Long.valueOf(DB_ID));
        requestView.setDoktorId(Long.valueOf(DOKTOR_ID));
        requestView.setPosiljalacId(POSTOJECI_ID);
        requestView.setTip(DB_TIP);

        ObjectMapper mapper = new ObjectMapper();
        mvc.perform(post(URL+"/zahtevSestre")
                .contentType(MediaType.APPLICATION_JSON)
                .content(mapper.writeValueAsString(requestView)))
                .andExpect(status().isCreated());

        Request r = this.requestService.findOne(Long.valueOf(DB_ID));

        assertEquals(r.getTip(), DB_TIP);
        assertEquals(r.getDatum(), DB_DATUM_SKRACEN);
        assertEquals(r.getPosiljalac().getId(), POSTOJECI_ID);
        assertEquals(r.getDoktor().getId(), Long.valueOf(DOKTOR_ID));



    }
}