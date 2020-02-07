package com.example.demo.controller;


import com.example.demo.model.Request;
import com.example.demo.model.Reservation;
import com.example.demo.service.RequestService;
import com.example.demo.service.ReservationService;
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

    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping(value = "/rezervisi")
    public ResponseEntity<?> rezervisi(@RequestBody ReservationView reservationView){

        Request r = this.requestService.findOne(Long.parseLong(""+reservationView.getId()));
        reservationView.setDatum(r.getDatum());

        this.reservationService.save(reservationView);

        return new ResponseEntity<>(null, HttpStatus.OK);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping(value = "/traziRezercavije")
    public ResponseEntity<?> traziRezercavije(@RequestBody ReservationView reservationView){
        //SAMO PO DATUMU CU
        //AKO NADJE BAR JEDAN, TO JE TO NEMERE
        Boolean moze = true;
        List<Reservation> rez = this.reservationService.findAll();
        System.out.println("SICKOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO");
        for(Reservation r: rez){
            System.out.println("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!OVDJEEEE VAKOOOOO DATUM "+r.getDatum()+" je poredio sa "+reservationView.getDatum());
            System.out.println("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!OVDJEEEE VAKOOOOO IDJEVI "+r.getIdSale()+" je poredio sa "+reservationView.getIdSale());
            if(r.getDatum().equals(reservationView.getDatum()) && r.getIdSale().equals(reservationView.getIdSale())){
                System.out.println("FOLSUJE GAAA");
                moze=false;
                break;
            }
        }

        System.out.println("Oce moci??? "+moze);
        return new ResponseEntity<>(moze,HttpStatus.OK);

    }



}
