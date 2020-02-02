package com.example.demo.model;

import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

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



    private String name;

    private String city;

    private int likes;

    private String picture;


    @ManyToOne(fetch = FetchType.EAGER)
    private ClinicCenter clinicCenter;

    //veze sa klinikom mogu imati doktor, sestra i admin klinike
    @OneToMany(mappedBy = "clinic", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<User> user = new ArrayList<>();
}
