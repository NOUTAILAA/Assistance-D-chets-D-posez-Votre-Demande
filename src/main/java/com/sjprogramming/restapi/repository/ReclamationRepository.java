package com.sjprogramming.restapi.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.sjprogramming.restapi.entity.Reclamation;

public interface ReclamationRepository extends JpaRepository<Reclamation, Long> {
	List<Reclamation> findByUserId(Long userId);
}
