package com.example.demo.service;

import com.example.demo.model.Checkup;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.TestPropertySource;
import static org.assertj.core.api.Assertions.assertThat;
import org.springframework.test.context.junit4.SpringRunner;

import static com.example.demo.constants.DatabaseConstants.NOVI_ID_PACIJENTA;
import static com.example.demo.constants.DatabaseConstants.POSTOJECI_ID;
import static org.junit.Assert.*;
@RunWith(SpringRunner.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@TestPropertySource("classpath:resources.properties")
public class CheckupServiceTest {

    @Autowired
    CheckupService checkupService;

    @Test
    public void modifikuj() {
        Checkup c = this.checkupService.findOne(POSTOJECI_ID);
        c.setIdPacijenta(NOVI_ID_PACIJENTA);
        this.checkupService.modifikuj(c);

        Checkup c2 = this.checkupService.findOne(POSTOJECI_ID);
        assertThat(c2.getIdPacijenta()).isEqualTo(NOVI_ID_PACIJENTA);
    }
}