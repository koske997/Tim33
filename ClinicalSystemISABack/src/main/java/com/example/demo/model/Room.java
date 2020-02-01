package com.example.demo.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Room {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "number", nullable = false)
    private Integer number;

    @Column(name = "free")
    private Boolean free;

    @OneToMany(mappedBy = "room", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<User> userList = new ArrayList<>();

    //Sa ovim se desava rekurzivna beskonacnost, sa JeonIgnore puca program, ovako radi
    //@OneToMany(mappedBy = "room", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    //private List<Checkup> checkupList = new ArrayList<>();

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
            name="room_checkup",
            joinColumns = @JoinColumn(name = "room_id"),
            inverseJoinColumns = @JoinColumn(name = "checkup_id")
    )
    private List<Checkup> checkups;


   /* @JsonIgnore
    @OneToOne
    @JoinColumn(name = "operationId")
    private Operation operationRoom;*/



}
