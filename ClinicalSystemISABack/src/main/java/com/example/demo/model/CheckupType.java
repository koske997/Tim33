package com.example.demo.model;

import lombok.*;

import javax.persistence.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class CheckupType {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name", nullable = false, unique = true)
    private String name;

    //@ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    //private Medicine medicine;
}
