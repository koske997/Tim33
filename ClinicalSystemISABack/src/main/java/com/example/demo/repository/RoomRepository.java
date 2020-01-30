package com.example.demo.repository;

import com.example.demo.model.Clinic;
import com.example.demo.model.Room;
import com.example.demo.model.User;
import com.example.demo.model.UserRole;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RoomRepository extends JpaRepository<Room, Long> {

    List<Room> findAll();

    Room findOneByNumber(int number);


}
