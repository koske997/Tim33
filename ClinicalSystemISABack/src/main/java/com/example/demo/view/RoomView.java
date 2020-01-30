package com.example.demo.view;


public class RoomView {


    private int id;
    private int broj;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    private String slobodna;

    public RoomView() {}

    public RoomView(int id, int number, String slobodna) {
        this.id = id;
        this.broj = number;
        this.slobodna = slobodna;
    }

    public int getBroj() {
        return broj;
    }

    public void setBroj(int number) {
        this.broj = number;
    }

    public String getSlobodna() {
        return slobodna;
    }

    public void setSlobodna(String slobodna) {
        this.slobodna = slobodna;
    }
}
