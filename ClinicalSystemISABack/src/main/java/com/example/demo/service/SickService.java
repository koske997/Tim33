package com.example.demo.service;

import com.example.demo.model.CheckupType;
import com.example.demo.model.Sick;
import com.example.demo.repository.*;
import com.example.demo.view.CheckupTypeView;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SickService {

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
    private SickRepository sickRepository;

    @Autowired
    private AuthorityService authorityService;

    public List<Sick> findAll() {
        return this.sickRepository.findAll();
    }

    //public User findOne(Long id) {
  //      return this.userRepository.findById(id).orElseGet(null);
 //   }

    public Sick findOneBySickNumber (int sickNumber) { return this.sickRepository.findOneBySickNumber(sickNumber);}

}
