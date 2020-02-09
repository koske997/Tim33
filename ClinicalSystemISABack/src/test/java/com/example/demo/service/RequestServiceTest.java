package com.example.demo.service;

import com.example.demo.model.Request;
import com.example.demo.view.RequestView;
import org.junit.Test;
import org.junit.runner.RunWith;

import static com.example.demo.constants.DatabaseConstants.*;
import static org.assertj.core.api.Assertions.assertThat;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

import static org.junit.Assert.*;

@RunWith(SpringRunner.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@TestPropertySource("classpath:resources.properties")
public class RequestServiceTest {

    @Autowired
    RequestService requestService;

    @Test
    public void findOne() {
        RequestView requestView = new RequestView();
        requestView.setDatum(DB_DATUM);
        requestView.setTip(DB_TIP);
        requestView.setAdminId(Long.parseLong("1"));
        requestView.setDoktorId(Long.parseLong("2"));
        requestView.setPosiljalacId(Long.parseLong("4"));

        Request r = this.requestService.save(requestView);

        Request r2 = this.requestService.findOne(Long.parseLong(""+DB_ID));

        assertThat(r2).isNotNull();
        assertThat(r2.getId()).isEqualTo(Long.parseLong(""+DB_ID));
        assertThat(r2.getTip()).isEqualTo(DB_TIP);
        assertThat(r2.getDatum()).isEqualTo(DB_DATUM);

    }


    @Test
    @Transactional
    public void save() {
        RequestView requestView = new RequestView();
        requestView.setDatum(DB_DATUM);
        requestView.setTip(DB_TIP);
        requestView.setAdminId(Long.parseLong("1"));
        requestView.setDoktorId(Long.parseLong("2"));
        requestView.setPosiljalacId(Long.parseLong("4"));

        int velicina_pre = this.requestService.findAll().size();
        Request r = this.requestService.save(requestView);
        assertThat(r).isNotNull();

        List<Request> lista = this.requestService.findAll();

        assertThat(lista).hasSize(velicina_pre+1);

        Request r2 = lista.get(lista.size()-1);
        assertThat(r2.getDatum()).isEqualTo(DB_DATUM);
        assertThat(r2.getTip()).isEqualTo(DB_TIP);

    }

    @Test
    @Transactional
    public void deleteById(){
        RequestView requestView = new RequestView();
        requestView.setDatum(DB_DATUM);
        requestView.setTip(DB_TIP);
        requestView.setAdminId(Long.parseLong("1"));
        requestView.setDoktorId(Long.parseLong("2"));
        requestView.setPosiljalacId(Long.parseLong("4"));

        Request r = this.requestService.save(requestView);

        int duzina = this.requestService.findAll().size();

        this.requestService.deleteById(Long.parseLong(""+DB_ID));
        List<Request> lista = this.requestService.findAll();
        assertThat(lista).hasSize(duzina-1);

        Request r2 = this.requestService.findOne(Long.parseLong(""+DB_ID));
        assertThat(r2).isNull();

    }



}