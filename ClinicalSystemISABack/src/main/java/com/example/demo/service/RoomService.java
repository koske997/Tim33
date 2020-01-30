package com.example.demo.service;

import com.example.demo.model.*;
import com.example.demo.repository.RoomRepository;
import com.example.demo.view.CheckupView;
import com.example.demo.view.RoomView;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Calendar;
import java.util.List;

@Service
public class RoomService {

    @Autowired
    private RoomRepository roomRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private AuthorityService authorityService;

    //public User findOne(Long id) {
    //    return this.clinicRepository.findById(id).orElseGet(null);
    // }

    //public List<User> findAllByRole(UserRole role) {return this.userRepository.findAllByRole(role); }

    public List<Room> findAll() {
        return this.roomRepository.findAll();
    }

    public Page<Room> findAll(Pageable page) {
        return this.roomRepository.findAll(page);
    }

    public Room findOneByENumber(int number) {
        return this.roomRepository.findOneByNumber(number);
    }


    public Room save(RoomView room)
    {
        Boolean sl;

        if ( room.getSlobodna().equalsIgnoreCase("true"))
            sl = true;
        else
            sl = false;

        Room r = Room.builder().number(room.getBroj()).free(sl).build();

        return this.roomRepository.save(r);
    }

    public Room modifikacija(RoomView room) {
        Boolean sl;

        if (room.getSlobodna().equalsIgnoreCase("true"))
            sl = true;
        else
            sl = false;

        List<Room> roomList = this.findAll();
        Room rm = new Room();

        for (Room r : roomList)
        {
            if (r.getId() == room.getId())
            {
                r.setFree(sl);
                r.setNumber(room.getBroj());

                rm = r;
            }
        }

        return this.roomRepository.save(rm);
    }

    public void remove(Long id) {
        this.roomRepository.deleteById(id);
    }

    public void delete(Room r)
    {
        this.roomRepository.delete(r);
    }
}
