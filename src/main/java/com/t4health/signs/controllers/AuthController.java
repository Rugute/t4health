package com.t4health.signs.controllers;

import com.t4health.signs.dtos.LoginRequest;
import com.t4health.signs.dtos.RegisterRequest;
import com.t4health.signs.dtos.UserResponse;
import com.t4health.signs.model.User;
import com.t4health.signs.services.UserService;
import com.t4health.signs.utils.Diagnosis;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
//import com.t4health.signs.utils;


import java.util.Date;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    private final UserService service;

    public AuthController(UserService service) {
        this.service = service;
    }
    @GetMapping("/hello")
    public String hello() {
        //String xx = Diagnosis.
        Diagnosis diagnosisResult = new Diagnosis();
        String xx = diagnosisResult.checker();
        return "Hello, the time at the server is now " + new Date() + " "+xx+ "\n";
    }

    @PostMapping("/register")
    public ResponseEntity<UserResponse> register(
            @Valid @RequestBody RegisterRequest request
    ) {
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(service.register(request));
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(
            @Valid @RequestBody LoginRequest request
    ) {
        User user = service.authenticate(request.getEmail(), request.getPassword());
        return ResponseEntity.ok("Login successful for " + user.getEmail());
    }
}
