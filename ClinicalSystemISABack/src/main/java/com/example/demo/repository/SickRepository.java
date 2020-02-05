package com.example.demo.repository;

import com.example.demo.model.Clinic;
import com.example.demo.model.Sick;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SickRepository extends JpaRepository<Sick, Long> {

    List<Sick> findAll();

    Sick findOneBySickNumber(int sickNumber);
}
