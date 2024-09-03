package com.example.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.domain.Detail;

public interface DetailRepository extends JpaRepository<Detail, Long>  {

}
