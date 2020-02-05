package com.example.demo.controller;

import com.example.demo.DemoApplication;
import com.example.demo.model.Mail;
import com.example.demo.model.Request;
import com.example.demo.model.User;
import com.example.demo.service.MailService;
import com.example.demo.service.RequestService;
import com.example.demo.service.UserService;
import com.example.demo.view.MailView;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class MailController {

    @Autowired
    private RequestService requestService;

    @Autowired
    private UserService userService;

    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping(value = "/mailSestre")
    public ResponseEntity<?> mailSestre(@RequestBody MailView mailView){

        Mail mail = new Mail();
        mail.setMailFrom(mailView.getMailFrom());
        mail.setMailTo("koske.koske035@gmail.com");
        mail.setMailSubject("Zahtev za "+mailView.getMailTo()+" od "+mailView.getMailFrom());
        mail.setMailContent("Zelela bih da dobijem "+mailView.getMailTo()+". Razlog: "+mailView.getDodatak());
        MailService mailService = DemoApplication.getCtx();
        mailService.sendMail(mail);


        return  new ResponseEntity<>(HttpStatus.CREATED);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping(value = "/mailPotvrda")
    public ResponseEntity<?> mailPotvrda(@RequestBody MailView mailView){

        Request r = this.requestService.findOne(Long.parseLong(mailView.getDodatak()));
        String razlog = "";
        if(r.getTip().equals("godisnji")) razlog="godisnjim odmorom";
        else if(r.getTip().equals("odsustvo")) razlog="odsustvom";
        else razlog=r.getTip()+" pregled";

        User u = r.getPosiljalac();
        System.out.println("!!!!!!!!!!!!!!!!!!!!!!!EVOOOOOOOOOOOO to je :  "+u.getEmail());


        Mail mail = new Mail();
        mail.setMailFrom(mailView.getMailFrom());
        //ovo ces srediti posle, do tada da vidim jel salje
        //mail.setMailTo(mailView.getMailTo());
        mail.setMailTo(u.getEmail());

        mail.setMailSubject("Zahtev za "+razlog+" od "+mailView.getMailFrom());

        if(mailView.getMailTo().equals("Prihvati")){
            mail.setMailContent("Vas zahtev za "+razlog+" je prihvacen.");
        }else mail.setMailContent("Vas zahtev za "+razlog+" je odbijen. Razlog : "+mailView.getMailTo());

        MailService mailService = DemoApplication.getCtx();
        mailService.sendMail(mail);


        return  new ResponseEntity<>(HttpStatus.CREATED);
    }







}
