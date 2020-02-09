package com.example.demo.view;

public class ClinicViewModification {

    private int id;
    private String adresa;
    private String name;
    private float x;
    private float y;



    public ClinicViewModification() {
    }

    public ClinicViewModification(int id, String adresa, float x, float y, String name) {
        this.id = id;
        this.adresa = adresa;
        this.x = x;
        this.y = y;
        this.name = name;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getAdresa() {
        return adresa;
    }

    public void setAdresa(String adresa) {
        this.adresa = adresa;
    }

    public float getX() {
        return x;
    }

    public void setX(float x) {
        this.x = x;
    }

    public float getY() {
        return y;
    }

    public void setY(float y) {
        this.y = y;
    }
}
