package com.t4health.signs.controllers;

import com.t4health.signs.dtos.LoginRequest;
import com.t4health.signs.dtos.RegisterRequest;
import com.t4health.signs.dtos.UserResponse;
import com.t4health.signs.model.User;
import com.t4health.signs.repositories.UserRepository;
import com.t4health.signs.services.UserService;
import com.t4health.signs.utils.Diagnosis;
import com.t4health.signs.utils.JwtUtil;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;


import java.util.Date;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final UserRepository repo;
    private final PasswordEncoder encoder;
    private final JwtUtil jwtUtil;

    private final UserService service;


    public AuthController(UserRepository repo, PasswordEncoder encoder, JwtUtil jwtUtil,UserService service) {
        this.repo = repo;
        this.encoder = encoder;
        this.jwtUtil = jwtUtil;
        this.service = service;
    }

    @GetMapping("/hello")
    public String hello() {
        //String xx = Diagnosis.
        Diagnosis diagnosisResult = new Diagnosis();
        String xx = diagnosisResult.checker();
        return "Hello, the time at the server is now " + new Date() + " "+xx+ "\n";
    }

    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody User user) {
        user.setPassword(encoder.encode(user.getPassword()));
        repo.save(user);
        return ResponseEntity.ok("User registered");
    }

    @PostMapping("/signin")
    public ResponseEntity<?> signin(@RequestBody Map<String, String> req) {
        User user = repo.findByEmail(req.get("email"))
                .orElseThrow(() -> new RuntimeException("Invalid credentials"));

        if (!encoder.matches(req.get("password"), user.getPassword())) {
            throw new RuntimeException("Invalid credentials");
        }

        String token = jwtUtil.generateToken(user.getEmail());
        return ResponseEntity.ok(Map.of("token", token));
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
