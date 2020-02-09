package com.example.demo.controller;

import com.example.demo.model.Reservation;
import com.example.demo.service.CheckupService;
import com.example.demo.service.RequestService;
import com.example.demo.service.ReservationService;
import com.example.demo.view.RequestView;
import com.example.demo.view.ReservationView;
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
public class ReservationControllerIntegrationTest {

    @Autowired
    private MockMvc mvc;

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Autowired
    private ReservationService reservationService;

    @Autowired
    private RequestService requestService;

    private final String URL="http://localhost:3000";

    @Before
    public void setup() {

    }

    @Test
    public void rezervisi() throws Exception {
        RequestView r = new RequestView();
        r.setDatum(DB_DATUM);
        r.setTip(DB_TIP);
        r.setAdminId(ADMIN_ID);
        r.setPosiljalacId(Long.parseLong(""+PACIJENT_ID));
        r.setDoktorId(Long.parseLong(""+DOKTOR_ID));
        this.requestService.save(r);


        ReservationView reservationView = new ReservationView();
        reservationView.setId(Long.parseLong(""+DB_ID));
        reservationView.setIdSale(""+ID_SALE);

        ObjectMapper mapper = new ObjectMapper();
        mvc.perform(post(URL+"/rezervisi")
                .contentType(MediaType.APPLICATION_JSON)
                .content(mapper.writeValueAsString(reservationView)))
                .andExpect(status().isOk());

        Reservation rr = this.reservationService.findOneByDatum(DB_DATUM);
        assertEquals(rr.getIdSale(), ""+ID_SALE);

    }
}