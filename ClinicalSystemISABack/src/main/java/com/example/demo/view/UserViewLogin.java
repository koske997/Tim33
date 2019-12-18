package com.example.demo.view;

public class UserViewLogin {

    private String email;
    private String password;

    public UserViewLogin() {
        super();
    }

    public UserViewLogin(String email, String password) {
        this.email = email;
        this.password = password;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
