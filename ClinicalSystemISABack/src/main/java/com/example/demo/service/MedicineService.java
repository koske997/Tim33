package com.example.demo.service;

import com.example.demo.model.Medicine;
import com.example.demo.model.Sick;
import com.example.demo.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MedicineService {

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
    private MedicineRepository medicineRepository;

    @Autowired
    private AuthorityService authorityService;

    public List<Medicine> findAll() {
        return this.medicineRepository.findAll();
    }

    public Medicine findOneByName (String name) { return this.medicineRepository.findOneByName(name);}
}
