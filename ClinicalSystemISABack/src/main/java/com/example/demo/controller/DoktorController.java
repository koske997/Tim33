package com.example.demo.controller;

import com.example.demo.model.*;
import com.example.demo.security.TokenUtils;
import com.example.demo.service.*;

import com.example.demo.view.CheckupDoctorView;
import com.example.demo.view.CheckupTypeView;
import com.example.demo.view.RoomView;
import com.example.demo.view.UserViewRegister;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@RestController
public class DoktorController {
    @Autowired
    TokenUtils tokenUtils;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private SickService sickService;

    @Autowired
    private MedicineService medicineService;

    @Autowired
    private CheckupDoctorService checkupDoctorService;


    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping(produces = MediaType.APPLICATION_JSON_VALUE, path = "/sveBolesti")
    public ResponseEntity<?> bolesti() {

        System.out.println("s");
        List<Sick> bolesti = this.sickService.findAll();

        return new ResponseEntity<>(bolesti, HttpStatus.OK);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping(produces = MediaType.APPLICATION_JSON_VALUE, path = "/sviLekovi")
    public ResponseEntity<?> lekovi() {

        List<Medicine> lekovi = this.medicineService.findAll();

        return new ResponseEntity<>(lekovi, HttpStatus.OK);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping(value = "/unosPregledaDoktora")
    public ResponseEntity<?> unosPregledaDoktora(@RequestBody CheckupDoctorView checkup) {

        System.out.println(checkup.getNaziv());

        //CheckupType saveCheckup = this.checkupTypeService.save(checkup);

        Checkup saveCheckup = this.checkupDoctorService.save(checkup);


        return new ResponseEntity<Checkup>(saveCheckup, HttpStatus.CREATED);
    }

}
