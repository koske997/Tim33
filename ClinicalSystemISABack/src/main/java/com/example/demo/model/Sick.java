package com.example.demo.model;

import lombok.*;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Sick {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "description")
    private String description;

    @Column(name = "dateStart", nullable = false)
    @Temporal(TemporalType.TIMESTAMP)
    private java.util.Calendar dateStart;

    @Column(name = "dateEnd")
    @Temporal(TemporalType.TIMESTAMP)
    private java.util.Calendar dateEnd;

    @ManyToMany(mappedBy = "sickList")
    private List<MedicalRecord> medicalRecordList = new ArrayList<MedicalRecord>();
}
