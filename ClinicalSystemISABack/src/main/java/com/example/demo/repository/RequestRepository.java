package com.example.demo.repository;

import com.example.demo.model.Request;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import javax.transaction.Transactional;
import java.util.List;

public interface RequestRepository extends JpaRepository<Request,Long> {

    Request findOneById(Long id);
    List<Request> findAll();

    @Modifying
    @Transactional
    @Query(nativeQuery = true, value = "delete from request r where r.id=:id")
    void deleteRequest(@Param("id") Long id);

}
