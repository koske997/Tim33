package com.example.demo.view;

public class OcenaKlinikeILekaraView {

    private int id; // ako hocemo da ocenimo lekara, ovde je id Lekara, a ako hocemo kliniku, ovde je id Klinike
    private int idPregleda;
    private int ocena;

    public OcenaKlinikeILekaraView () {}

    public OcenaKlinikeILekaraView(int id, int idPregleda, int ocena) {
        this.id = id;
        this.idPregleda = idPregleda;
        this.ocena = ocena;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getIdPregleda() {
        return idPregleda;
    }

    public void setIdPregleda(int idPregleda) {
        this.idPregleda = idPregleda;
    }

    public int getOcena() {
        return ocena;
    }

    public void setOcena(int ocena) {
        this.ocena = ocena;
    }
}
