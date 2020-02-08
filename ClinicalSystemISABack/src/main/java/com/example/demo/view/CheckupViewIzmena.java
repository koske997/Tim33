package com.example.demo.view;

public class CheckupViewIzmena {
    private int id;
    private String name;
    private String opis;
    private String tip;
    private int trajanje;
    private int cena;


    public CheckupViewIzmena() {}

    public CheckupViewIzmena(int id, String name, String opis, String tip, int trajanje, int cena) {
        this.id = id;
        this.name = name;
        this.opis = opis;
        this.tip = tip;
        this.trajanje = trajanje;
        this.cena = cena;
    }

    public int getCena() {
        return cena;
    }

    public void setCena(int cena) {
        this.cena = cena;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getOpis() {
        return opis;
    }

    public void setOpis(String opis) {
        this.opis = opis;
    }

    public String getTip() {
        return tip;
    }

    public void setTip(String tip) {
        this.tip = tip;
    }

    public int getTrajanje() {
        return trajanje;
    }

    public void setTrajanje(int trajanje) {
        this.trajanje = trajanje;
    }
}
