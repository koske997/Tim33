package com.example.demo.controller;

import com.example.demo.exception.ResourceConflictException;
import com.example.demo.model.*;
import com.example.demo.repository.UserRepository;
import com.example.demo.security.TokenUtils;
import com.example.demo.service.*;

import com.example.demo.view.*;
import org.hibernate.annotations.Check;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import java.util.List;

@RestController
public class AKlinikeController {
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
    private CheckupService checkupService;

    @Autowired
    private CheckupTypeService checkupTypeService;

    @Autowired
    private RoomService roomService;

    @Autowired
    private RequestService requestService;

    @Autowired
    private UserRepository userRepository;



    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping(value = "/unosPregleda")
    public ResponseEntity<?> unosPregleda(@RequestBody CheckupView checkup) {

        System.out.println(checkup.getTip());

        Checkup saveCheckup = this.checkupService.save(checkup);

        return new ResponseEntity<>(saveCheckup, HttpStatus.CREATED);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping(value = "/zakaziPregled")
    public ResponseEntity<?> zakaziPregled(@RequestBody CheckupView checkupView){
            Request r = this.requestService.findOne(Long.parseLong(checkupView.getLekar()));
            checkupView.setDatumVreme(r.getDatum());
            checkupView.setLekar(r.getDoktor().getId().toString());
            checkupView.setIdPac(""+r.getPosiljalac().getId());

            this.checkupService.saveCheckup(checkupView);

            return new ResponseEntity<>(null, HttpStatus.OK);
    }



    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping(produces = MediaType.APPLICATION_JSON_VALUE, path = "/sviTipoviPregleda")
    public ResponseEntity<?> sviTipoviPregleda() {

        List<CheckupType> tipoviPregleda = this.checkupTypeService.findAll();

        return new ResponseEntity<>(tipoviPregleda, HttpStatus.OK);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping(value = "/unosSale")
    public ResponseEntity<?> unosSale(@RequestBody RoomView roomView) {

        System.out.println("VVVVVVVVVVV" + roomView.getSlobodna() + roomView.getBroj());

        Room saveRoom = this.roomService.save(roomView);

        return new ResponseEntity<Room>(saveRoom, HttpStatus.CREATED);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping(value = "/modifikujSalu")
    public ResponseEntity<?> modifikacijaSale(@RequestBody RoomView room) {

        System.out.println("CCCCCCCC" + room.getBroj()+ ' '+ room.getSlobodna() + ' ' + room.getId());

        Room modRoom = this.roomService.modifikacija(room);

        return new ResponseEntity<Room>(modRoom, HttpStatus.CREATED);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping(value = "/izbrisiSalu")
    public ResponseEntity<?> izbrisiSalu(@RequestBody RoomView room) {

        System.out.println("CCCCCCCC" + room.getBroj()+ ' '+ room.getSlobodna() + ' ' + room.getId());

        this.roomService.remove(Integer.toUnsignedLong(room.getId()));

        List<Room> roomList = this.roomService.findAll();
        Room rm = new Room();

        for (Room r : roomList)
        {
            if (r.getId() == room.getId())
            {
                rm = r;
                this.roomService.delete(r);
            }
        }

        return new ResponseEntity<Room>(HttpStatus.CREATED);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping(produces = MediaType.APPLICATION_JSON_VALUE, path = "/sviPregledi")
    public ResponseEntity<?> sviPregledi() {

        System.out.println("VVVVVVVVVVVVVV");


        List<Checkup> pregledi = this.checkupService.findAll();

        System.out.println("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA" + pregledi);


        return new ResponseEntity<>(pregledi, HttpStatus.OK);

    }

    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping(value = "/modifikujTipPregleda")
    public ResponseEntity<?> modifikacijaTipaPregleda(@RequestBody CheckupTypeView checkupView) {

        CheckupType cut = this.checkupTypeService.modifikacija(checkupView);

        return new ResponseEntity<>(cut, HttpStatus.OK);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping(value = "/unosTipaPregleda")
    public ResponseEntity<?> unosTipaPregleda(@RequestBody CheckupTypeView checkup) {

        System.out.println(checkup.getNaziv());

        CheckupType saveCheckup = this.checkupTypeService.save(checkup);

        return new ResponseEntity<CheckupType>(saveCheckup, HttpStatus.CREATED);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping(value = "/adminBriseLekara")
    public ResponseEntity<?> adminBriseLekara(@RequestBody IdView id) {

        System.out.println("--------------------------------------------------------------------");
        System.out.println(id.getId());

        this.userRepository.deleteRequest(Long.valueOf(id.getId()));
        User u = new User();

        return new ResponseEntity<User>(u, HttpStatus.CREATED);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping(value = "/unosLekara")
    public ResponseEntity<?> unosLekara(@RequestBody UserViewRegister user, UriComponentsBuilder ucBuilder) {

        User userFind = this.userService.findOneByEmail(user.getEmail());

        System.out.println("999999999999999999999999999");
        System.out.println(user.getUserId());
        System.out.println(user.getEmail());

        User u = new User();
        u.setFirstName("IMA");
        if (userFind != null) {
            return new ResponseEntity<User>(u, HttpStatus.OK);
        }

        User saveUser = this.userService.save(user);


        return new ResponseEntity<User>(saveUser, HttpStatus.CREATED);
    }
}
