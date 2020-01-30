package com.example.demo.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import javax.persistence.*;
import java.sql.Timestamp;
import java.util.Calendar;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Checkup {


    private boolean enabled;


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "description")
    private String description;


    @Column(name = "type")
    private String type;

    @Column(name = "duration")
    private float duration;

    @Column(name = "price")
    private float price;

    @Column(name = "dateTime", nullable = false)
    @Temporal(TemporalType.TIMESTAMP)
    private java.util.Calendar dateTime;

    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private MedicalRecord medRecord;

    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private User doctor;

    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private User patient;

    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private Room room;
}
