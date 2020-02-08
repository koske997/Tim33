package com.example.demo.controller;

import com.example.demo.dto.UserTokenState;
import com.example.demo.exception.ResourceConflictException;
import com.example.demo.model.User;
import com.example.demo.model.UserRole;
import com.example.demo.security.TokenUtils;
import com.example.demo.service.*;
import com.example.demo.view.UserViewLogin;
import com.example.demo.view.UserViewRegister;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;

@RestController
public class LoginController {

    @Autowired
    TokenUtils tokenUtils;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private CustomUserDetailsService userDetailsService;

    @Autowired
    private UserService userService;

    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping(produces = MediaType.APPLICATION_JSON_VALUE, path = "/login")
    public ResponseEntity<UserTokenState> login(@RequestBody UserViewLogin user) throws AuthenticationException, IOException {

        final Authentication authentication = authenticationManager
                .authenticate(new UsernamePasswordAuthenticationToken(user.getEmail(), user.getPassword()));

        //ubaci username(email) + password u kontext
        SecurityContextHolder.getContext().setAuthentication(authentication);

        //Kreiraj token
        User userToken = (User) authentication.getPrincipal();
        String jwt = tokenUtils.generateToken(userToken.getEmail());
        int expiresIn = tokenUtils.getExpiredIn();
        //vrati token kao odgovor na uspesnu autentifikaciju
        return ResponseEntity.ok(new UserTokenState(jwt, expiresIn));
    }

    //@CrossOrigin(origins = "http://localhost:3000")
    @PostMapping(value = "/register")
    public ResponseEntity<?> register(@RequestBody UserViewRegister user, UriComponentsBuilder ucBuilder) {

        User userFind = this.userService.findOneByEmail(user.getEmail());
        User u = new User();
        u.setFirstName("IMA");
        if (userFind != null) {
            return new ResponseEntity<User>(u, HttpStatus.OK);
        }

        User saveUser = this.userService.save(user);
        HttpHeaders headers = new HttpHeaders();
        headers.setLocation(ucBuilder.path("/api/user/userId}").buildAndExpand(saveUser.getId()).toUri());
        return new ResponseEntity<User>(saveUser, HttpStatus.CREATED);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping(produces = MediaType.APPLICATION_JSON_VALUE, path = "/medsestre")
    public ResponseEntity<?> medsestre() {

        List<User> medsestre = this.userService.findAllByRole(UserRole.valueOf("NURSE"));


        return new ResponseEntity<>(medsestre, HttpStatus.OK);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping(produces = MediaType.APPLICATION_JSON_VALUE, path = "/doktori")
    public ResponseEntity<?> doktori() {

        List<User> doktori = this.userService.findAllByRole(UserRole.valueOf("DOCTOR"));


        return new ResponseEntity<>(doktori, HttpStatus.OK);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping(produces = MediaType.APPLICATION_JSON_VALUE, path = "/adminiklinike")
    public ResponseEntity<?> adminiklinike() {

        List<User> adminiKlinike = this.userService.findAllByRole(UserRole.valueOf("ADMINC"));


        return new ResponseEntity<>(adminiKlinike, HttpStatus.OK);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping(produces = MediaType.APPLICATION_JSON_VALUE, path = "/adminiCentra")
    public ResponseEntity<?> adminiCentra() {

        List<User> adminiKlinickogCentra = this.userService.findAllByRole(UserRole.valueOf("ADMINCC"));


        return new ResponseEntity<>(adminiKlinickogCentra, HttpStatus.OK);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping(produces = MediaType.APPLICATION_JSON_VALUE, path = "/sviubazi")
    public ResponseEntity<?> sviUBazi() {

        List<User> sviUBazi = this.userService.findAll();


        return new ResponseEntity<>(sviUBazi, HttpStatus.OK);
    }

}
