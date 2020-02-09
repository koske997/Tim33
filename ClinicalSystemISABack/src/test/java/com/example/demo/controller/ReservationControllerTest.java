package com.example.demo.controller;

import com.example.demo.TestUtil;
import com.example.demo.model.Request;
import com.example.demo.service.RequestService;
import com.example.demo.view.RequestView;
import com.example.demo.view.ReservationView;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.context.WebApplicationContext;

import javax.annotation.PostConstruct;
import java.io.IOException;
import java.nio.charset.Charset;

import static com.example.demo.constants.DatabaseConstants.*;
import static org.junit.Assert.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@RunWith(SpringRunner.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@TestPropertySource("classpath:resources.properties")
public class ReservationControllerTest {

    private static final String URL_PREFIX = "http://localhost:3000";

    private MediaType contentType = new MediaType(
            MediaType.APPLICATION_JSON.getType(),
            MediaType.APPLICATION_JSON.getSubtype(),
            Charset.forName("utf8"));

    private MockMvc mockMvc;

    @Autowired
    private WebApplicationContext webApplicationContext;

    @Autowired
    private RequestService requestService;

    @PostConstruct
    public void setup(){
        this.mockMvc = MockMvcBuilders.
                webAppContextSetup(webApplicationContext).build();
    }


    @Test
    @Transactional
    public void rezervisi() throws Exception {
        //NEMA U BAZI ZAHTEVA PA PRAVIMO RUCNO JEDAN
        RequestView r = new RequestView();
        r.setDatum(DB_DATUM);
        r.setTip(DB_TIP);
        r.setAdminId(ADMIN_ID);
        r.setPosiljalacId(Long.parseLong(""+PACIJENT_ID));
        r.setDoktorId(Long.parseLong(""+DOKTOR_ID));

        this.requestService.save(r);

        ReservationView re = new ReservationView();
        re.setId(Long.parseLong(""+DB_ID));
        re.setIdSale(""+ID_SALE);


        String json = TestUtil.json(re);

        this.mockMvc.perform(post(URL_PREFIX+"/rezervisi")
                .contentType(contentType)
                .content(json))
                .andExpect(status().isOk());

    }
}