package com.t4health.signs.repositories;

import com.t4health.signs.model.Patient;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface PatientRepository extends JpaRepository<Patient, Long> {
    Optional<Patient> findByIdno(String email);
    List<Patient> findAll();
    Patient findById(int id);
}