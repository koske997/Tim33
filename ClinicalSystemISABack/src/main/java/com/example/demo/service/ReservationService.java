package com.example.demo.service;

import com.example.demo.model.Reservation;
import com.example.demo.repository.ReservationRepository;
import com.example.demo.view.ReservationView;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Transactional
@Service
public class ReservationService {

    @Autowired
    private ReservationRepository reservationRepository;

    public List<Reservation> findAll(){return this.reservationRepository.findAll();}

    public Reservation findOneByDatum(String datum){return  this.reservationRepository.findOneByDatum(datum);}


    public Reservation save(ReservationView reservationView){

        String datum = reservationView.getDatum();
        datum = datum.replaceAll("-","/");
        datum = datum.replaceAll("T"," ");
        datum = datum.replaceAll("Z"," ");
       // datum = datum.substring(0, datum.length()-8);

        Reservation r = Reservation.builder().idSale(reservationView.getIdSale()).datum(datum).build();
        this.reservationRepository.save(r);

        return  r;
    }



}
