package com.example.demo.view;

public class UserViewPromenaLozinke {

    private Long id;
    private String lozinka;


    public UserViewPromenaLozinke() {}

    public UserViewPromenaLozinke(Long id, String lozinka) {
        this.id = id;
        this.lozinka = lozinka;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getLozinka() {
        return lozinka;
    }

    public void setLozinka(String lozinka) {
        this.lozinka = lozinka;
    }
}
