package com.example.demo.repository;

import com.example.demo.model.Checkup;
import com.example.demo.model.CheckupType;
import com.example.demo.model.User;
import com.example.demo.model.UserRole;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CheckupTypeRepository extends JpaRepository<CheckupType, Long> {

    //User findOneByEmailAndPassword(String email, String password);
    //User findOneByEmail(String email);
    //List<User> findAllByRole(UserRole role);

    CheckupType findOneByName (String naziv);

    //CheckupType removeById(int id);

}
