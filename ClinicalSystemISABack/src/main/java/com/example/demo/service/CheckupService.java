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

import java.time.LocalDateTime;
import java.util.Calendar;
import java.util.List;

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
        User u = new User();

        Calendar cal = Calendar.getInstance();

        String doktor = checkup.getLekar();

        String [] podaci = doktor.split(" ");

        String emailDoktor = podaci[2];

        System.out.println(emailDoktor);

        User doctor = this.userRepository.findOneByEmail(emailDoktor);

        System.out.println(doctor);

        int brojSobe = Integer.parseInt(checkup.getSala());

        Room room = this.roomRepository.findOneByNumber(brojSobe);

        System.out.println(checkup.getLekar());

        System.out.println(checkup.getTrajanje() + "BBBBBBBBBBBBBBBBBBBBBBBBB");


        Checkup c = Checkup.builder().name(checkup.getNaziv()).description(checkup.getOpis()).type(checkup.getTip())
                .doctor(doctor).room(room).medRecord(null).price(Integer.parseInt(checkup.getCena())).duration(Integer.parseInt(checkup.getTrajanje())).dateTime(cal).patient(null).enabled(true).build();


        return this.checkupRepository.save(c);
    }

    public void remove(Long id) {
        this.checkupRepository.deleteById(id);
    }

    public Checkup findOneByNameAndType(String naziv, String tip) {
        return this.checkupRepository.findOneByNameAndType(naziv, tip);
    }




}
