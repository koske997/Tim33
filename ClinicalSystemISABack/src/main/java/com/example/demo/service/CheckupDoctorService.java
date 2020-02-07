package com.example.demo.service;

import com.example.demo.model.*;
import com.example.demo.repository.*;
import com.example.demo.view.CheckupDoctorView;
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
public class CheckupDoctorService {

    @Autowired
    private CheckupRepository checkupRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private RoomRepository roomRepository;

    @Autowired
    private SickRepository sickRepository;

    @Autowired
    private MedicineRepository medicineRepository;


    @Autowired
    private AuthorityService authorityService;



    public Checkup save(CheckupDoctorView checkup)
    {
        /*User u = new User();
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
        List<User> doc = new ArrayList<>();
        doc.add(doctor);
        Set<Room> ro = new HashSet<>();
        ro.add(room);
        Checkup c = Checkup.builder().name(checkup.getNaziv()).description(checkup.getOpis()).type(checkup.getTip())
                .doctor(doc).rooms(ro).price(Integer.parseInt(checkup.getCena())).duration(Integer.parseInt(checkup.getTrajanje())).dateTime(cal).build();
        doctor.setCheckup(c);
        return this.userRepository.save(doctor);*/

        System.out.println("----------------------------------------------------------");
        System.out.println(checkup.getNaziv());
        System.out.println(checkup.getOpis());
        System.out.println(checkup.getCena());
        System.out.println(checkup.getTip());
        System.out.println(checkup.getLek());
        System.out.println(checkup.getBolest());
        System.out.println(checkup.getIdLekara());
        System.out.println(checkup.getIdPacijenta());
        System.out.println(checkup.getDatumVreme());

        User doktor = this.userRepository.findOneById(Long.valueOf(checkup.getIdLekara()));
        User pacijent = this.userRepository.findOneById(Long.valueOf(checkup.getIdPacijenta()));

        int brojBolesti = Integer.parseInt(checkup.getBolest());
        String imeLeka = checkup.getLek();

        Sick bolest = this.sickRepository.findOneBySickNumber(brojBolesti);
        Medicine lek = this.medicineRepository.findOneByName(imeLeka);

        System.out.println(doktor.getEmail());
        System.out.println(pacijent.getEmail());
        System.out.println(bolest.getName());
        System.out.println(lek.getName());


        //Calendar cal = Calendar.getInstance();
        //DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm");
        //Date date = new Date();



        Set<Sick> bolesti = new HashSet<>();
        bolesti.add(bolest);





        Checkup c = Checkup.builder().name(checkup.getNaziv()).description(checkup.getOpis()).type(checkup.getTip())
                .duration(2).price(Integer.parseInt(checkup.getCena())).dateTime(checkup.getDatumVreme()).ocenjenaKlinika(false).ocenjenLekar(false)
                .sicks(bolesti).unapred(false).idLekara(checkup.getIdLekara()).idPacijenta(checkup.getIdPacijenta()).build();


        //doktor.setCheckup(c);
        //pacijent.setCheckup(c);

        bolest.setCheckup(c);

        //this.userRepository.save(doktor);
        //this.userRepository.save(pacijent);

        return this.checkupRepository.save(c);
    }




}
