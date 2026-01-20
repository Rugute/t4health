package com.t4health.signs.controllers;

import com.t4health.signs.model.Patient;
import com.t4health.signs.model.User;
import com.t4health.signs.services.PatientService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/patient")
public class PatientController {

    private final PatientService patientService;

    public PatientController(PatientService patientService) {
        this.patientService = patientService;
    }
    @PostMapping("/register")
    public ResponseEntity<Patient> register(
            @RequestBody Patient request) {
        Patient response = patientService.register(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }
    @GetMapping("/list")
    public ResponseEntity<List<Patient>> userList() {
        List<Patient> patientList = patientService.getAll();
        return ResponseEntity.ok(patientList);  // Spring Boot automatically converts to JSON
    }
    @GetMapping("/delete/{id}")
    public ResponseEntity<?> deleteUser(
            @PathVariable Long id) {
        Patient user = patientService.findById(id.intValue())
                .orElseThrow(() -> new RuntimeException("User not found"));
        user.setVoided(1);
        patientService.save(user);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body("User deleted successfully");
    }
}
