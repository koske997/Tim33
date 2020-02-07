package com.example.demo.view;

public class ReservationView {

    private Long id;
    private String idSale;
    private String datum;

    public ReservationView(Long id, String idSale, String datum) {
        this.id = id;
        this.idSale = idSale;
        this.datum = datum;
    }

    public ReservationView() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getIdSale() {
        return idSale;
    }

    public void setIdSale(String idSale) {
        this.idSale = idSale;
    }

    public String getDatum() {
        return datum;
    }

    public void setDatum(String datum) {
        this.datum = datum;
    }
}
