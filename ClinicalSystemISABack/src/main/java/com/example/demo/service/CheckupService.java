package com.example.demo.service;

import com.example.demo.model.*;
import com.example.demo.repository.CheckupRepository;
import com.example.demo.repository.RoomRepository;
import com.example.demo.repository.UserRepository;
import com.example.demo.view.CheckupView;
import com.example.demo.view.UserViewRegister;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.util.*;

@Service
public class CheckupService {

    @Autowired
    private CheckupRepository checkupRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private RoomRepository roomRepository;

    @Autowired
    private AuthorityService authorityService;

    public Checkup findOne(Long id) {
        return this.checkupRepository.findById(id).orElseGet(null);
    }

    public List<Checkup> findAll() {
        return this.checkupRepository.findAll();
    }

    //public Page<User> findAll(Pageable page) {
     //   return this.userRepository.findAll(page);
    //}


    public Checkup save(CheckupView checkup)
    {
        System.out.println(checkup.getTip());
        System.out.println(checkup.getTrajanje());
        System.out.println(checkup.getLekar());
        System.out.println(checkup.getCena());
        System.out.println(checkup.getNaziv());
        System.out.println(checkup.getOpis());
        System.out.println(checkup.getSala());
        System.out.println(checkup.getDatumVreme());



        User u = new User();


        String doktor = checkup.getLekar();

        String [] podaci = doktor.split(" ");

        String emailDoktor = podaci[2];

        System.out.println(emailDoktor);

        User doctor = this.userRepository.findOneByEmail(emailDoktor);

        System.out.println(doctor);


        int brojSobe = Integer.parseInt(checkup.getSala());
        Room room = this.roomRepository.findOneByNumber(brojSobe);


        List<User> doc = new ArrayList<>();
        doc.add(doctor);

        Set<Room> ro = new HashSet<>();
        ro.add(room);


        Checkup c = Checkup.builder().name(checkup.getNaziv()).description(checkup.getOpis()).type(checkup.getTip()).
                idLekara((int) (long)doctor.getId()).unapred(true).
                rooms(ro).price(Integer.parseInt(checkup.getCena())).duration(Integer.parseInt(checkup.getTrajanje())).dateTime(checkup.getDatumVreme())
                .ocenjenaKlinika(false).ocenjenLekar(false).build();


        return this.checkupRepository.save(c);
    }

    public void remove(Long id) {
        this.checkupRepository.deleteById(id);
    }

    public Checkup findOneByNameAndType(String naziv, String tip) {
        return this.checkupRepository.findOneByNameAndType(naziv, tip);
    }




}
