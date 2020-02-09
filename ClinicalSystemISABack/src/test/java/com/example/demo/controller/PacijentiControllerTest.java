package com.example.demo.controller;

import com.example.demo.TestUtil;
import com.example.demo.view.ClinicView;
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
public class PacijentiControllerTest {

    private static final String URL_PREFIX = "http://localhost:3000";

    private MediaType contentType = new MediaType(
            MediaType.APPLICATION_JSON.getType(),
            MediaType.APPLICATION_JSON.getSubtype(),
            Charset.forName("utf8"));

    private MockMvc mockMvc;

    @Autowired
    private WebApplicationContext webApplicationContext;

    @PostConstruct
    public void setup(){
        this.mockMvc = MockMvcBuilders.
                webAppContextSetup(webApplicationContext).build();
    }


    @Test
    @Transactional
    public void pretraziKlinike() throws Exception {
        ClinicView clinicView = new ClinicView();
        clinicView.setNaziv(NAZIV_KLINIKE);
        clinicView.setGrad(GRAD_KLINIKE);
        clinicView.setLajkovi(LAJKOVI_KLINIKE);
        clinicView.setTip(TIP_PREGLEDA);

        String json = TestUtil.json(clinicView);

        this.mockMvc.perform(post(URL_PREFIX+"/pretraziKlinike")
                .contentType(contentType)
                .content(json))
                .andExpect(status().isOk());

    }
}