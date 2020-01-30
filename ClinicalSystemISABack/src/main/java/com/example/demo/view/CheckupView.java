package com.example.demo.view;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

public class CheckupView {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private String naziv;
    private String opis;
    private String tip;
    private String sala;
    private String lekar;
    private String cena;
    private String trajanje;
    private String datumVreme;


    public CheckupView(String opis, String tip, String sala, String lekar, String cena, String trajanje, String datumVreme) {
        this.opis = opis;
        this.tip = tip;
        this.sala = sala;
        this.lekar = lekar;
        this.cena = cena;
        this.trajanje = trajanje;
        this.datumVreme = datumVreme;
    }

    public CheckupView() {
    }


    public String getTrajanje() {
        return trajanje;
    }

    public void setTrajanje(String trajanje) {
        this.trajanje = trajanje;
    }

    public String getNaziv() {
        return naziv;
    }

    public void setNaziv(String naziv) {
        this.naziv = naziv;
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

    public String getSala() {
        return sala;
    }

    public void setSala(String sala) {
        this.sala = sala;
    }

    public String getLekar() {
        return lekar;
    }

    public void setLekar(String lekar) {
        this.lekar = lekar;
    }

    public String getCena() {
        return cena;
    }

    public void setCena(String cena) {
        this.cena = cena;
    }

    public String getDatumVreme() {
        return datumVreme;
    }

    public void setDatumVreme(String datumVreme) {
        this.datumVreme = datumVreme;
    }
}
