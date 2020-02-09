package com.example.demo.repository;

import com.example.demo.model.Checkup;
import com.example.demo.model.CheckupType;
import com.example.demo.model.User;
import com.example.demo.model.UserRole;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface CheckupTypeRepository extends JpaRepository<CheckupType, Long> {

    //User findOneByEmailAndPassword(String email, String password);
    //User findOneByEmail(String email);
    //List<User> findAllByRole(UserRole role);

    CheckupType findOneByName (String naziv);

    @Modifying
    @Transactional
    @Query(nativeQuery = true, value = "delete from checkup_type c where c.id=:id")
    void deleteRequest(@Param("id") Long id);

    //CheckupType removeById(int id);

}
