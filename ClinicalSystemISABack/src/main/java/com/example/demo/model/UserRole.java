package com.example.demo.model;

import lombok.Getter;

@Getter
public enum UserRole {

    DOCTOR("DOCTOR"), PATIENT("PATIENT"), NURSE("NURSE"), ADMINC("ADMINC"), ADMINCC("ADMINCC"), ADMIN("ADMIN");

    private String role;

    UserRole(String role) {
        this.role = role;
    }
}
