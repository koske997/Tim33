package com.example.demo.controller;

import com.example.demo.model.*;
import com.example.demo.security.TokenUtils;
import com.example.demo.service.ClinicService;
import com.example.demo.service.CustomUserDetailsService;

import com.example.demo.service.RoomService;
import com.example.demo.service.UserService;
import com.example.demo.view.CheckupDoctorView;
import com.example.demo.view.OcenaKlinikeILekaraView;
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

        Set<MedicalRecord> ml = new HashSet<>();
        //ml = loggedUser.getMedicalRecords();

        return new ResponseEntity<>(ml, HttpStatus.OK);
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

    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping(value = "/izmeniPrijavljenogKorisnika")
    public ResponseEntity<?> izmenaKorisnika(@RequestBody UserViewRegister userView) throws AuthenticationException, IOException {

        System.out.println("CCCCCCCC" + userView.getEmail() + ' ' + userView.getId() + ' ' + userView.getAddress());

        User modUser = this.userService.modifikacija(userView);

        return new ResponseEntity<User>(modUser, HttpStatus.CREATED);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping(value = "/unosOceneLekara")
    public ResponseEntity<?> unosOceneLekara(@RequestBody OcenaKlinikeILekaraView podaci) {

        System.out.println(podaci.getId());
        System.out.println(podaci.getOcena());
        System.out.println(podaci.getIdPregleda());

        Checkup u = this.userService.unosOcene(podaci);

        return new ResponseEntity<>(u, HttpStatus.CREATED);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping(value = "/unosOceneKlinike")
    public ResponseEntity<?> unosOceneKlinike(@RequestBody OcenaKlinikeILekaraView podaci) {

        System.out.println(podaci.getId());
        System.out.println(podaci.getOcena());
        System.out.println(podaci.getIdPregleda());


        Checkup c = this.clinicService.unosOcene(podaci);


        return new ResponseEntity<>(c, HttpStatus.CREATED);
    }
}
