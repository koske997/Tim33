package com.example.demo.service;

import com.example.demo.model.Authority;
import com.example.demo.model.Clinic;
import com.example.demo.model.User;
import com.example.demo.model.UserRole;
import com.example.demo.repository.ClinicRepository;
import com.example.demo.repository.UserRepository;
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

}
