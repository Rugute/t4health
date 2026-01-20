package com.t4health.signs.services;

import com.t4health.signs.dtos.PatientResponse;
import com.t4health.signs.model.Patient;
import com.t4health.signs.model.User;
import com.t4health.signs.repositories.PatientRepository;
import com.t4health.signs.repositories.UserRepository;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PatientService {

    private final PatientRepository patientRepository;

    public PatientService(PatientRepository patientRepository) {
        this.patientRepository = patientRepository;
    }

    public Patient register(Patient request) {
        Patient saved = patientRepository.save(request);
        return saved;
    }
    public List<Patient> getAll(){
        return patientRepository.findAll();
    }
    public Patient findById(int id){
        return patientRepository.findById(id);
    }
    public Patient save(Patient patient){
        return patientRepository.save(patient);
    }

}
