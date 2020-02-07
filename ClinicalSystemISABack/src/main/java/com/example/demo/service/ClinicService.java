package com.example.demo.service;

import com.example.demo.model.*;
import com.example.demo.repository.CheckupRepository;
import com.example.demo.repository.ClinicRepository;
import com.example.demo.repository.UserRepository;
import com.example.demo.view.OcenaKlinikeILekaraView;
import com.example.demo.view.UserViewRegister;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ClinicService {

    @Autowired
    private ClinicRepository clinicRepository;

    @Autowired
    private CheckupRepository checkupRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private AuthorityService authorityService;

    //public User findOne(Long id) {
    //    return this.clinicRepository.findById(id).orElseGet(null);
   // }

    //public List<User> findAllByRole(UserRole role) {return this.userRepository.findAllByRole(role); }

    public List<Clinic> findAll() {
        return this.clinicRepository.findAll();
    }

    public Page<Clinic> findAll(Pageable page) {
        return this.clinicRepository.findAll(page);
    }

    public Clinic findOneById(Long id){ return  this.clinicRepository.findOneById(id);}

    public Checkup unosOcene(OcenaKlinikeILekaraView podaci) {

        int idKlinike = podaci.getId();

        List<Clinic> clinicList = this.clinicRepository.findAll();
        Clinic cl = new Clinic();

        for (Clinic c : clinicList)
        {
            if (c.getId() == idKlinike)
            {
                int noviBrPutaOcenjivanja = c.getBrPutaOcenjivanja() + 1;
                float novaOcena = (c.getBrPutaOcenjivanja()*c.getOcena() + podaci.getOcena()) / noviBrPutaOcenjivanja;

                c.setBrPutaOcenjivanja(noviBrPutaOcenjivanja);
                c.setOcena(novaOcena);

                cl = c;
            }
        }

        List<Checkup> cll = checkupRepository.findAll();
        Checkup ch = new Checkup();
        for ( Checkup c : cll)
        {
            if (c.getId() == podaci.getIdPregleda())
            {
                c.setOcenjenaKlinika(true);
                ch = c;
            }
        }

        return this.checkupRepository.save(ch);
    }

}
