package com.example.demo.view;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

public class RequestView {


    private String tip;
    private String datum;
    private Long doktorId;
    private Long adminId;
    private Long posiljalacId;

    public RequestView(String tip, String datum, Long doktorId, Long adminId, Long posiljalacId) {
        this.tip = tip;
        this.datum = datum;
        this.doktorId = doktorId;
        this.adminId = adminId;
        this.posiljalacId = posiljalacId;
    }

    public RequestView() {
    }

    public String getTip() {
        return tip;
    }

    public void setTip(String tip) {
        this.tip = tip;
    }

    public String getDatum() {
        return datum;
    }

    public void setDatum(String datum) {
        this.datum = datum;
    }

    public Long getDoktorId() {
        return doktorId;
    }

    public void setDoktorId(Long doktorId) {
        this.doktorId = doktorId;
    }

    public Long getAdminId() {
        return adminId;
    }

    public void setAdminId(Long adminId) {
        this.adminId = adminId;
    }

    public Long getPosiljalacId() {
        return posiljalacId;
    }

    public void setPosiljalacId(Long posiljalacId) {
        this.posiljalacId = posiljalacId;
    }
}
