package com.example.demo.controller;

import com.example.demo.model.*;
import com.example.demo.repository.UserRepository;
import com.example.demo.security.TokenUtils;
import com.example.demo.service.*;

import com.example.demo.view.*;

import org.hibernate.annotations.Check;
import com.example.demo.service.ClinicService;
import com.example.demo.service.CustomUserDetailsService;

import com.example.demo.service.RoomService;
import com.example.demo.service.UserService;
import com.example.demo.view.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
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

    @Autowired
    private PasswordEncoder passwordEncoder;
    //@Autowired
    //private CustomClinicDetailsService clinicDetailsService;
    @Autowired
    private CheckupService checkupService;

    @Autowired
    private UserService userService;

    @Autowired
    private UserRepository userRepository;

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
    @PostMapping(value = "/promenaLozinke")
    public ResponseEntity<?> promenaLozinke(@RequestBody UserViewPromenaLozinke podaci) {

        System.out.println("----------------------------------------------------------------------------");
        System.out.println(podaci.getId());
        System.out.println(podaci.getLozinka());

        User u = this.userService.findOneById(podaci.getId());
        System.out.println(u.getEmail());

        u.setPassword(passwordEncoder.encode(podaci.getLozinka()));
        u.setPrvaPrijava(false);

        User saved = this.userRepository.save(u);

        return new ResponseEntity<>(saved, HttpStatus.OK);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping(value = "/pretraziKlinike")
    public ResponseEntity<?> pretraziKlinike(@RequestBody ClinicView clinicView){

        List<Clinic> lista = this.clinicService.findAll();
        List<Clinic> ret = new ArrayList<Clinic>();

        if(!clinicView.getTip().equals("")){
            List<Checkup> sviPregledi = this.checkupService.findAll();
            List<User> doktori = new ArrayList<User>();
            List<Checkup> pregledi = new ArrayList<Checkup>();
            List<Integer> idjevi = new ArrayList<Integer>();

            for(Checkup ch : sviPregledi){
                if(ch.getType().equals(clinicView.getTip()) && !idjevi.contains(ch.getIdLekara())){
                    idjevi.add(ch.getIdLekara());
                }
            }

            for(int ind : idjevi){
                String str = ""+ind;
                User doktor = this.userService.findOneById(Long.parseLong(str));
                doktori.add(doktor);
            }

            for(User d : doktori){
                ret.add(d.getClinic());
            }
        }else ret.addAll(lista);



        List<Clinic> pomocna3 = new ArrayList<Clinic>();
        if(!clinicView.getNaziv().equals("")) {
            for (Clinic c : ret) {
                if (!c.getName().toLowerCase().startsWith(clinicView.getNaziv().toLowerCase())) {
                    pomocna3.add(c);
                }
            }
            ret.removeAll(pomocna3);
        }

        List<Clinic> pomocna = new ArrayList<Clinic>();
        if(!clinicView.getGrad().equals("")){
           for(Clinic c : ret){
               if(!c.getCity().toLowerCase().startsWith(clinicView.getGrad().toLowerCase())){
                   pomocna.add(c);
               }
           }
           ret.removeAll(pomocna);
        }

        List<Clinic> pomocna2 = new ArrayList<Clinic>();
        if(clinicView.getLajkovi()!=0){
            for(Clinic c : ret){
                if(c.getLikes() < clinicView.getLajkovi()){
                    pomocna2.add(c);
                }
            }
            ret.removeAll(pomocna2);
        }

        return new ResponseEntity<>(ret, HttpStatus.OK);
    }


    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping(value = "/vratiPotrebneDoktore")
    public ResponseEntity<?> vratiPotrebneDoktore(@RequestBody ClinicView clinicView){

        List<Integer> idievi = new ArrayList<Integer>();
        Clinic klinika = this.clinicService.findOneById(clinicView.getId());
        List<Checkup> sviPregledi = this.checkupService.findAll();
        List<User> doktori = new ArrayList<User>();

        if(!clinicView.getTip().equals("")) {
            for (Checkup pre : sviPregledi) {
                if (pre.getType().equals(clinicView.getTip()) && !idievi.contains(pre.getIdLekara())) {
                    idievi.add(pre.getIdLekara());
                }
            }

            for (int ind : idievi) {
                User dok = this.userService.findOneById(Long.parseLong("" + ind));
                if (dok.getClinic().getId().equals(clinicView.getId())) doktori.add(dok);
            }
        }else{
            for(User dok : this.userService.findAllByRole(UserRole.valueOf("DOCTOR"))){
                if(dok.getClinic().getId().equals(clinicView.getId())){
                    doktori.add(dok);
                }
            }
        }




        return new ResponseEntity<>(doktori, HttpStatus.OK);
    }




}
