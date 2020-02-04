package com.example.demo.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.*;

import javax.persistence.*;
import java.sql.Timestamp;
import java.util.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Checkup {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "unapred_definisan")
    private boolean unapred;

    @Column(name = "name")
    private String name;

    @Column(name = "description")
    private String description;


    @Column(name = "type")
    private String type;

    @Column(name = "duration")
    private float duration;

    @Column(name = "price")
    private float price;

    @Column(name = "dateTime")
    @Temporal(TemporalType.TIMESTAMP)
    private java.util.Calendar dateTime;


    @Column(name = "id_lekara")
    private int idLekara;

    @Column(name = "id_pacijenta")
    private int idPacijenta;

    //@OneToMany(mappedBy = "checkup", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    //@JsonManagedReference
    //private Set<MedicalRecord> medicalRecords = new HashSet<>();



    //@OneToMany(mappedBy = "checkup", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    //private List<User> doctor = new ArrayList<>();

    //@OneToMany(mappedBy = "checkupPatient", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    //private List<User> patient = new ArrayList<>();


    @OneToMany(mappedBy = "checkup", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonManagedReference
    private Set<Room> rooms = new HashSet<>();




    @OneToMany(mappedBy = "checkup", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonManagedReference
    private Set<Sick> sicks = new HashSet<>();

    //@ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    //private Room room;
}
