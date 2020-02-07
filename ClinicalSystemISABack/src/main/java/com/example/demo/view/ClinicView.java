package com.example.demo.view;

public class ClinicView {

    private Long id;
    private String naziv;
    private String grad;
    private int lajkovi;
    private String tip;

    public ClinicView(Long id, String naziv, String grad, int lajkovi, String tip) {
        this.id = id;
        this.naziv = naziv;
        this.grad = grad;
        this.lajkovi = lajkovi;
        this.tip = tip;
    }

    public ClinicView() {
    }


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNaziv() {
        return naziv;
    }

    public void setNaziv(String naziv) {
        this.naziv = naziv;
    }

    public String getGrad() {
        return grad;
    }

    public void setGrad(String grad) {
        this.grad = grad;
    }

    public int getLajkovi() {
        return lajkovi;
    }

    public void setLajkovi(int lajkovi) {
        this.lajkovi = lajkovi;
    }

    public String getTip() {
        return tip;
    }

    public void setTip(String tip) {
        this.tip = tip;
    }
}
