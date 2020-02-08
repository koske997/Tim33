package com.example.demo.controller;


import com.example.demo.model.Request;
import com.example.demo.model.Reservation;
import com.example.demo.model.Room;
import com.example.demo.service.RequestService;
import com.example.demo.service.ReservationService;
import com.example.demo.service.RoomService;
import com.example.demo.view.ReservationView;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class ReservationController {

    @Autowired
    private ReservationService reservationService;

    @Autowired
    private RequestService requestService;

    @Autowired
    private RoomService roomService;

    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping(value = "/rezervisi")
    public ResponseEntity<?> rezervisi(@RequestBody ReservationView reservationView){

        Request r = this.requestService.findOne(Long.parseLong(""+reservationView.getId()));
        reservationView.setDatum(r.getDatum());

        this.reservationService.save(reservationView);

        return new ResponseEntity<>(null, HttpStatus.OK);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping(value = "/rezervisiSalu")
    public ResponseEntity<?> rezervisiSalu(@RequestBody ReservationView reservationView){

        Room sala = this.roomService.findOneByENumber(Integer.parseInt(reservationView.getIdSale()));
        reservationView.setIdSale(""+sala.getId());

       this.reservationService.save2(reservationView);

        return new ResponseEntity<>(null, HttpStatus.OK);
    }


    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping(value = "/traziRezercavije")
    public ResponseEntity<?> traziRezercavije(@RequestBody ReservationView reservationView){
        //SAMO PO DATUMU CU
        //AKO NADJE BAR JEDAN, TO JE TO NEMERE
        Boolean moze = true;
        List<Reservation> rez = this.reservationService.findAll();
        for(Reservation r: rez){
            if(r.getDatum().equals(reservationView.getDatum()) && r.getIdSale().equals(reservationView.getIdSale())){
                moze=false;
                break;
            }
        }

        System.out.println("Oce moci??? "+moze);
        return new ResponseEntity<>(moze,HttpStatus.OK);

    }



}
