package com.example.demo.repository;

import com.example.demo.model.Checkup;
import com.example.demo.model.User;
import com.example.demo.model.UserRole;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CheckupRepository extends JpaRepository<Checkup, Long> {

    //User findOneByEmailAndPassword(String email, String password);
    //User findOneByEmail(String email);
    //List<User> findAllByRole(UserRole role);

    Checkup findOneByNameAndType (String naziv, String tip);
    List<Checkup> findAll();

}
