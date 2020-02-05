package com.example.demo.service;

import com.example.demo.model.Request;
import com.example.demo.model.User;
import com.example.demo.repository.RequestRepository;
import com.example.demo.repository.UserRepository;
import com.example.demo.view.RequestView;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Transactional
@Service
public class RequestService {

    @Autowired
    private RequestRepository requestRepository;

    @Autowired
    private UserRepository userRepository;

    public Request findOne(Long id){return requestRepository.findOneById(id);}
    public List<Request> findAll(){return requestRepository.findAll();}

    public void deleteById(Long id){this.requestRepository.deleteRequest(id);}

    public Request save(RequestView requestView){

        String tip = requestView.getTip();
        String datum = requestView.getDatum();
        Long adminId = requestView.getAdminId();
        Long doktorId = requestView.getDoktorId();
        Long posiljalacId = requestView.getPosiljalacId();


        //JEDINI ADMIN
        adminId = Long.parseLong("1");

        User posiljalac = this.userRepository.findOneById(posiljalacId);
        User admin = this.userRepository.findOneById(adminId);
        User doktor = this.userRepository.findOneById(doktorId);

        Request request = Request.builder().tip(tip).datum(datum).posiljalac(posiljalac).doktor(doktor).user(admin).build();



        return this.requestRepository.save(request);

    }

}
