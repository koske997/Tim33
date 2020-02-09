package com.example.demo.model;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
public class Clinic {

    @Id
    @GeneratedValue(strategy =  GenerationType.IDENTITY)
    private Long id;

    @Column(name = "br_puta_ocenjivanja")
    private int brPutaOcenjivanja;

    private String name;

    private String city;

    private int likes;

    private float ocena;

    private String picture;

    private String address;

    private float x;
    private float y;


    @ManyToOne(fetch = FetchType.EAGER)
    private ClinicCenter clinicCenter;

    @OneToMany(mappedBy = "clinic", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JsonManagedReference
    private Set<User> user = new HashSet<>();
}
