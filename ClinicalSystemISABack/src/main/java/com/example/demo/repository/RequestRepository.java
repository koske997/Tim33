package com.example.demo.repository;

import com.example.demo.model.Request;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RequestRepository extends JpaRepository<Request,Long> {

    Request findOneById(Long id);
    List<Request> findAll();
    void deleteById(Long id);


}
