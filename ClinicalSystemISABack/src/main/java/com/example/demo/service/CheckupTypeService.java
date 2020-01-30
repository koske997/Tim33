package com.example.demo.service;

import com.example.demo.model.*;
import com.example.demo.repository.CheckupRepository;
import com.example.demo.repository.CheckupTypeRepository;
import com.example.demo.repository.RoomRepository;
import com.example.demo.repository.UserRepository;
import com.example.demo.view.CheckupTypeView;
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
public class CheckupTypeService {

    @Autowired
    private CheckupRepository checkupRepository;

    @Autowired
    private CheckupTypeRepository checkupTypeRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private RoomRepository roomRepository;

    @Autowired
    private AuthorityService authorityService;

    public CheckupType findOne(Long id) {
        return this.checkupTypeRepository.findById(id).orElseGet(null);
    }

    public List<CheckupType> findAll() {
        return this.checkupTypeRepository.findAll();
    }

    public Page<CheckupType> findAll(Pageable page) {
       return this.checkupTypeRepository.findAll(page);
    }


    public CheckupType save(CheckupTypeView checkupTypeView)
    {
        CheckupType ct = CheckupType.builder().name(checkupTypeView.getNaziv()).build();

        return this.checkupTypeRepository.save(ct);
    }

    public CheckupType modifikacija(CheckupTypeView checkupTypeView)
    {
        //CheckupType ct = CheckupType.builder().name(checkupTypeView.getNaziv()).build();

        List<CheckupType> list = this.findAll();
        CheckupType ctype = new CheckupType();

        for (CheckupType ctt : list)
        {
            if(ctt.getId() == checkupTypeView.getId())
            {
                ctt.setName(checkupTypeView.getNaziv());
                ctype = ctt;
            }
        }

        return this.checkupTypeRepository.save(ctype);
    }

    public void remove(Long id) {
        this.checkupTypeRepository.deleteById(id);
    }

    public CheckupType findOneByName(String naziv) {
        return this.checkupTypeRepository.findOneByName(naziv);
    }




}
