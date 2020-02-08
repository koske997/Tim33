package com.example.demo.repository;

import com.example.demo.model.User;
import com.example.demo.model.UserRole;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface UserRepository extends JpaRepository<User, Long> {

    User findOneByEmailAndPassword(String email, String password);
    User findOneByEmail(String email);
    List<User> findAllByRole(UserRole role);
    List<User> findAllByRoleOrderByFirstName(UserRole role);

    User findOneById(Long id);

    @Modifying
    @Transactional
    @Query(nativeQuery = true, value = "delete from users u where u.id=:id")
    void deleteRequest(@Param("id") Long id);

}
