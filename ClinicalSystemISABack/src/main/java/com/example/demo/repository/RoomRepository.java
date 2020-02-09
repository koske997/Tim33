package com.example.demo.repository;

import com.example.demo.model.Clinic;
import com.example.demo.model.Room;
import com.example.demo.model.User;
import com.example.demo.model.UserRole;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface RoomRepository extends JpaRepository<Room, Long> {

    List<Room> findAll();

    Room findOneByNumber(int number);

    @Modifying
    @Transactional
    @Query(nativeQuery = true, value = "delete from room r where r.id=:id")
    void deleteRequest(@Param("id") Long id);



}
