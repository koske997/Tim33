package com.example.demo.controller;

import com.example.demo.model.Clinic;
import com.example.demo.service.RequestService;
import com.example.demo.view.ClinicView;
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
public class PacijentiControllerIntegrationTest {

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
    public void pretraziKlinike() throws Exception {
        ClinicView clinicView = new ClinicView();
        clinicView.setNaziv(NAZIV_KLINIKE2);
        clinicView.setGrad(GRAD_KLINIKE);
        clinicView.setLajkovi(LAJKOVI_KLINIKE);
        clinicView.setTip(TIP_PREGLEDA);

        ObjectMapper mapper = new ObjectMapper();
        mvc.perform(post(URL+"/pretraziKlinike")
                .contentType(MediaType.APPLICATION_JSON)
                .content(mapper.writeValueAsString(clinicView)))
                .andExpect(status().isOk());


    }
}