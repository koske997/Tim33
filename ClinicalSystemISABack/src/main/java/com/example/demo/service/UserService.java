package com.example.demo.service;

import com.example.demo.model.*;
import com.example.demo.repository.CheckupRepository;
import com.example.demo.repository.ClinicRepository;
import com.example.demo.repository.UserRepository;
import com.example.demo.view.OcenaKlinikeILekaraView;
import com.example.demo.view.RoomView;
import com.example.demo.view.UserViewRegister;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CheckupRepository checkupRepository;

    @Autowired
    private ClinicRepository clinicRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private AuthorityService authorityService;

    public User findOneById(Long id) {
        return this.userRepository.findOneById(id);
    }

    public List<User> findAllByRole(UserRole role) {return this.userRepository.findAllByRole(role); }

    public List<User> findAll() {
        return this.userRepository.findAll();
    }

    public Page<User> findAll(Pageable page) {
        return this.userRepository.findAll(page);
    }

    public User save(UserViewRegister user) {
        User u = User.builder().email(user.getEmail()).password(passwordEncoder.encode(user.getPassword()))
                .firstName(user.getFirstName()).lastName(user.getLastName())
                .address(user.getAddress()).city(user.getCity()).country(user.getCountry())
                .phoneNumber(user.getPhoneNumber()).userId(user.getUserId()).role(UserRole.valueOf(user.getRole()))
                .enabled(true).prvaPrijava(true).build();

        u.setPrvaPrijava(true);
        u.setBrPutaOcenjivanja(0);
        u.setLikes(0);

        Clinic c = this.clinicRepository.findOneById(Long.valueOf(user.getUserId()));

        System.out.println("22222222222222222222222222222222222222222222222222222222222");
        System.out.println(c.getName());
        u.setClinic(c);

        Set<User> us = new HashSet<>();
        us = c.getUser();
        us.add(u);
        c.setUser(us);




        return this.userRepository.save(u);
    }

    public User modifikacija(UserViewRegister u) {

        List<User> userList = this.findAll();
        User use = new User();

        for (User us : userList)
        {
            if (u.getId() == us.getId())
            {
                us.setAddress(u.getAddress());
                us.setCity(u.getCity());
                us.setCountry(u.getCountry());
                us.setEmail(u.getEmail());
                us.setFirstName(u.getFirstName());
                us.setLastName(u.getLastName());
                us.setPhoneNumber(u.getPhoneNumber());
                us.setPassword(passwordEncoder.encode(u.getPassword()));

                use = us;
            }
        }

        return this.userRepository.save(use);
    }

    public Checkup unosOcene(OcenaKlinikeILekaraView podaci) {

        int idLekara = podaci.getId();

        List<User> userList = this.findAll();
        User use = new User();

        for (User u : userList)
        {
            if (u.getId() == idLekara)
            {
                int noviBrPutaOcenjivanja = u.getBrPutaOcenjivanja() + 1;
                float novaOcena = (u.getBrPutaOcenjivanja()*u.getOcena() + podaci.getOcena()) / noviBrPutaOcenjivanja;
                u.setBrPutaOcenjivanja(noviBrPutaOcenjivanja);
                u.setOcena(novaOcena);

                use = u;
            }
        }

        List<Checkup> cl = checkupRepository.findAll();
        Checkup ch = new Checkup();
        for ( Checkup c : cl)
        {
            if (c.getId() == podaci.getIdPregleda())
            {
                c.setOcenjenLekar(true);
                ch = c;
            }
        }
        this.userRepository.save(use);

        return this.checkupRepository.save(ch);
    }



    public void remove(Long id) {
        this.userRepository.deleteById(id);
    }

    public User findOneByEmailAndPassword(String email, String password) {
        return this.userRepository.findOneByEmailAndPassword(email, password);
    }

    public User findOneByEmail(String email) {
        return this.userRepository.findOneByEmail(email);
    }
}
