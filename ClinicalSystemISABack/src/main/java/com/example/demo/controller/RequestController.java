package com.example.demo.controller;

import com.example.demo.model.Request;
import com.example.demo.service.RequestService;
import com.example.demo.view.RequestView;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.print.attribute.standard.Media;
import java.util.List;

@RestController
public class RequestController {


    @Autowired
    private RequestService requestService;

    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping(value = "/zahtevSestre")
    public ResponseEntity<?> zahtevSestre(@RequestBody RequestView requestView){

        Request r = this.requestService.save(requestView);

        return new ResponseEntity<Request>(r, HttpStatus.CREATED);
    }

    @CrossOrigin(origins = "ttp://localhost:3000")
    @GetMapping(produces= MediaType.APPLICATION_JSON_VALUE ,value = "/sviZahtevi")
    public ResponseEntity<?> sviZahtevi(){
        List<Request> lista = this.requestService.findAll();
        return new ResponseEntity<>(lista, HttpStatus.OK);
    }



}
