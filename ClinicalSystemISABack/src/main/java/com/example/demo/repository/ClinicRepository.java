package com.example.demo.repository;

import com.example.demo.model.Clinic;
import com.example.demo.model.User;
import com.example.demo.model.UserRole;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ClinicRepository extends JpaRepository<Clinic, Long> {

    List<Clinic> findAll();
    Clinic findOneById(Long id);

}
