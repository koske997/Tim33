package com.example.demo.model;

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
public class ClinicCenter {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    private String name;

//    @OneToMany(mappedBy = "clinicCenter", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
//    private List<Clinic> clinicList = new ArrayList<Clinic>();

    //samo admin klinickog centra sme
    @OneToMany(mappedBy = "clinicCenter", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<User> userList = new ArrayList<>();
}
