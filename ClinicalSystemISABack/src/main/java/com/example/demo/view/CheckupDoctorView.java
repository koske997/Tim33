package com.example.demo.view;

public class CheckupDoctorView { // Za unos pregleda kada doktor trenutno pregledava pacijenta

    private String naziv;
    private String opis;
    private String cena;
    private int idLekara;
    private int idPacijenta;
    private String tip;
    private String bolest;
    private String lek;
    private String datumVreme;

    public CheckupDoctorView () {}

    public CheckupDoctorView(String datumVreme, String naziv, String opis, String cena, int idLekara, int idPacijenta, String tip, String bolest, String lek) {
        this.datumVreme = datumVreme;
        this.naziv = naziv;
        this.opis = opis;
        this.cena = cena;
        this.idLekara = idLekara;
        this.idPacijenta = idPacijenta;
        this.tip = tip;
        this.bolest = bolest;
        this.lek = lek;
    }

    public String getDatumVreme() {
        return datumVreme;
    }

    public void setDatumVreme(String datumVreme) {
        this.datumVreme = datumVreme;
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

    public String getCena() {
        return cena;
    }

    public void setCena(String cena) {
        this.cena = cena;
    }

    public int getIdLekara() {
        return idLekara;
    }

    public void setIdLekara(int idLekara) {
        this.idLekara = idLekara;
    }

    public int getIdPacijenta() {
        return idPacijenta;
    }

    public void setIdPacijenta(int idPacijenta) {
        this.idPacijenta = idPacijenta;
    }

    public String getTip() {
        return tip;
    }

    public void setTip(String tip) {
        this.tip = tip;
    }

    public String getBolest() {
        return bolest;
    }

    public void setBolest(String bolest) {
        this.bolest = bolest;
    }

    public String getLek() {
        return lek;
    }

    public void setLek(String lek) {
        this.lek = lek;
    }
}
