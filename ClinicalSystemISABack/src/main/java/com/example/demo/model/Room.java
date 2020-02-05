package com.example.demo.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
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


    //Sa ovim se desava rekurzivna beskonacnost, sa JeonIgnore puca program, ovako radi
    //@OneToMany(mappedBy = "room", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    //private List<Checkup> checkupList = new ArrayList<>();

    @ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinColumn(name = "checkup_id")
    @JsonBackReference
    private Checkup checkup;


   /* @JsonIgnore
    @OneToOne
    @JoinColumn(name = "operationId")
    private Operation operationRoom;*/



}
