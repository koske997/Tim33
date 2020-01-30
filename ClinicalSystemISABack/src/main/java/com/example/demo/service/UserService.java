package com.example.demo.service;

import com.example.demo.model.Authority;
import com.example.demo.model.Room;
import com.example.demo.model.User;
import com.example.demo.model.UserRole;
import com.example.demo.repository.UserRepository;
import com.example.demo.view.RoomView;
import com.example.demo.view.UserViewRegister;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private AuthorityService authorityService;

    public User findOne(Long id) {
        return this.userRepository.findById(id).orElseGet(null);
    }

    public List<User> findAllByRole(UserRole role) {return this.userRepository.findAllByRole(role); }

    public List<User> findAll() {
        return this.userRepository.findAll();
    }

    public Page<User> findAll(Pageable page) {
        return this.userRepository.findAll(page);
    }

    public User save(UserViewRegister user) {
        User u = User.builder().email(user.getEmail()).password(passwordEncoder.encode(user.getPassword()))
                .firstName(user.getFirstName()).lastName(user.getLastName())
                .address(user.getAddress()).city(user.getCity()).country(user.getCountry())
                .phoneNumber(user.getPhoneNumber()).userId(user.getUserId()).role(UserRole.valueOf(user.getRole()))
                .enabled(true).build();

        List<Authority> auth = this.authorityService.findByName(user.getRole());
        u.setAuthorities(auth);

        return this.userRepository.save(u);
    }

    public User modifikacija(UserViewRegister u) {

        List<User> userList = this.findAll();
        User use = new User();

        for (User us : userList)
        {
            if (u.getId() == us.getId())
            {
                us.setAddress(u.getAddress());
                us.setCity(u.getCity());
                us.setCountry(u.getCountry());
                us.setEmail(u.getEmail());
                us.setFirstName(u.getFirstName());
                us.setLastName(u.getLastName());
                us.setPhoneNumber(u.getPhoneNumber());
                us.setPassword(u.getPassword());

                use = us;
            }
        }

        return this.userRepository.save(use);
    }

    public void remove(Long id) {
        this.userRepository.deleteById(id);
    }

    public User findOneByEmailAndPassword(String email, String password) {
        return this.userRepository.findOneByEmailAndPassword(email, password);
    }

    public User findOneByEmail(String email) {
        return this.userRepository.findOneByEmail(email);
    }
}
