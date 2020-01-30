package com.example.demo.controller;

import com.example.demo.model.*;
import com.example.demo.security.TokenUtils;
import com.example.demo.service.ClinicService;
import com.example.demo.service.CustomUserDetailsService;

import com.example.demo.service.RoomService;
import com.example.demo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class PacijentiController {
    @Autowired
    TokenUtils tokenUtils;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private CustomUserDetailsService userDetailsService;

    //@Autowired
    //private CustomClinicDetailsService clinicDetailsService;

    @Autowired
    private UserService userService;

    @Autowired
    private ClinicService clinicService;

    @Autowired
    private RoomService roomService;

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping(produces = MediaType.APPLICATION_JSON_VALUE, path = "/pacijenti")
    public ResponseEntity<?> pacijenti() {

        List<User> pacijenti = this.userService.findAllByRole(UserRole.valueOf("PATIENT"));

        return new ResponseEntity<>(pacijenti, HttpStatus.OK);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping(produces = MediaType.APPLICATION_JSON_VALUE, path = "/klinike")
    public ResponseEntity<?>klinike() {

        List<Clinic> klinike = this.clinicService.findAll();


        return new ResponseEntity<>(klinike, HttpStatus.OK);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping(produces = MediaType.APPLICATION_JSON_VALUE, path = "/medicinskiKartonUlogovanogKorisnika")
    public ResponseEntity<?> medicinskiKartonUlogovanogKorisnika() {

        User loggedUser = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        System.out.println("AAAAAAAAAAAAAAAAA" + loggedUser.getEmail() + "BBBBBBBBBBBBBBBBBBBBBBB");
        MedicalRecord karton = loggedUser.getMedicalRecord();

        return new ResponseEntity<>(karton, HttpStatus.OK);
    }


    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping(produces = MediaType.APPLICATION_JSON_VALUE, path = "/sveSale")
    public ResponseEntity<?>Sale() {


        List<Room> sale = this.roomService.findAll();

        return new ResponseEntity<>(sale, HttpStatus.OK);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping(produces = MediaType.APPLICATION_JSON_VALUE, path = "/sviDoktori")
    public ResponseEntity<?> doktori() {

        List<User> doktori = this.userService.findAllByRole(UserRole.valueOf("DOCTOR"));

        return new ResponseEntity<>(doktori, HttpStatus.OK);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping(produces = MediaType.APPLICATION_JSON_VALUE, path = "/prijavljenKorisnik")
    public ResponseEntity<?>prijavljenKorisnik() {

        User loggedUser = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        System.out.println("AAAAAAAAAAAAAAAAA" + loggedUser.getEmail() + "BBBBBBBBBBBBBBBBBBBBBBB");

        return new ResponseEntity<User>(loggedUser, HttpStatus.OK);
    }
}
