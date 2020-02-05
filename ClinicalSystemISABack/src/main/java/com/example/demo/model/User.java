package com.example.demo.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.*;
import java.sql.Timestamp;
import java.util.*;

@JsonInclude(JsonInclude.Include.NON_NULL)
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "users")
public class User implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String firstName;
    private String lastName;
    private String email;
    @JsonIgnore
    private String password;
    private String address;
    private String city;
    private String country;
    private Integer phoneNumber;
    private Integer likes;
    private Integer userId;
    @Enumerated(EnumType.STRING)
    private UserRole role;
    private boolean enabled;
    private Timestamp lastPasswordResetDate;

   // @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    //private List<Clinic> clinic = new ArrayList<>();

    //samo admin klinickog centra moze ovde
    @JsonIgnore
    @ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinColumn(name = "clinic_id")
    private Clinic clinic;

    @JsonIgnore
    @ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinColumn(name = "checkup_id")
    private Checkup checkup;

    //doktori
    @ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    private Room room;

    //doktori
    @ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    private Operation operation;

    //zahtevi
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JsonManagedReference
    private Set<Request> requests = new HashSet<Request>();

    //posiljaoci zahteva
    @OneToMany(mappedBy = "posiljalac", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JsonManagedReference
    private Set<Request> req2 = new HashSet<Request>();

    //doktori zahteva
    @OneToMany(mappedBy = "doktor", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JsonManagedReference
    private Set<Request> req3 = new HashSet<Request>();

    //Pri unosu pregleda, desi se rekurzivna besk. ako je ovo otkomentarisano, a jsa 2JsonIgnore, ne radi
    //OneToMany(mappedBy = "doctor", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    //private List<Checkup> checkupListDoctor = new ArrayList<>();

    //@OneToMany(mappedBy = "patient", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    //private List<Checkup> checkupListPatient = new ArrayList<>();

    //@OneToMany(mappedBy = "patient", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
   // private List<Checkup> checkupListPatient = new ArrayList<>();



    //pacijent sa zdravstvenim kartonom, nova tabela
    @OneToOne(fetch = FetchType.EAGER)
    @JoinTable(
            name = "patient_med_record",
            joinColumns = @JoinColumn(name = "patient_id"),
            inverseJoinColumns = @JoinColumn(name = "med_record_id")
    )
    private MedicalRecord medicalRecord;

    //operacije i pacijenti, nova tabela
    @OneToOne(fetch = FetchType.EAGER)
    @JoinTable(
            name = "patient_operation",
            joinColumns = @JoinColumn(name = "patient_id"),
            inverseJoinColumns = @JoinColumn(name = "operation_id")
    )
    private Operation operationPatient;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
            name="user_authorities",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "authority_name", referencedColumnName = "name")
    )
    private List<Authority> authorities;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return this.authorities;
    }

    @Override
    public String getPassword() {
        return password;
    }

    public void setAuthorities(List<Authority> authorities) {
        this.authorities = authorities;
    }

    @Override
    public boolean isEnabled() {
        return enabled;
    }

    public void setEnabled(boolean enabled) {
        this.enabled = enabled;
    }

    public Timestamp getLastPasswordResetDate() {
        return lastPasswordResetDate;
    }

    public void setLastPasswordResetDate(Timestamp lastPasswordResetDate) {
        this.lastPasswordResetDate = lastPasswordResetDate;
    }

    @JsonIgnore
    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @JsonIgnore
    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @JsonIgnore
    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public String getUsername() {
        return email;
    }
}
