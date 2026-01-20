package com.t4health.signs.controllers;

import com.t4health.signs.dtos.LoginRequest;
import com.t4health.signs.model.User;
import com.t4health.signs.repositories.UserRepository;
import com.t4health.signs.services.UserService;
import com.t4health.signs.utils.DiagnosisChecker;
import com.t4health.signs.utils.JwtUtil;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;


import java.util.Date;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final UserRepository repo;
    private final PasswordEncoder encoder;
    private final JwtUtil jwtUtil;

    private final UserService userService;
    //private final DiagnosisChecker diagnosisChecker;


    public AuthController(UserRepository repo, PasswordEncoder encoder, JwtUtil jwtUtil,UserService userService) {
        this.repo = repo;
        this.encoder = encoder;
        this.jwtUtil = jwtUtil;
        this.userService = userService;
       // this.diagnosisChecker=diagnosisChecker;
    }

    @GetMapping("/hello")
    public String hello() {
        //String xx = Diagnosis.
       // DiagnosisChecker diagnosisResult = new DiagnosisChecker();
       // String xx = diagnosisChecker.checker();
        return "Hello, the time at the server is now " + new Date() + " \n";
    }

    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody User user) {
        if (repo.existsByEmail(user.getEmail())) {
            return ResponseEntity
                    .status(HttpStatus.CONFLICT)
                    .body("Email already exists");
        }

        user.setPassword(encoder.encode(user.getPassword()));
        repo.save(user);

        return ResponseEntity.status(HttpStatus.CREATED)
                .body("User registered successfully");
    }

    @PutMapping("/users/{id}")
    public ResponseEntity<?> updateUser(
            @PathVariable Long id,
            @RequestBody User updatedUser) {

        User user = repo.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // Prevent duplicate email (excluding current user)
        if (!user.getEmail().equals(updatedUser.getEmail())
                && repo.existsByEmail(updatedUser.getEmail())) {
            return ResponseEntity
                    .status(HttpStatus.CONFLICT)
                    .body("Email already exists");
        }

        user.setFirstName(updatedUser.getFirstName());
        user.setLastName(updatedUser.getLastName());
        user.setEmail(updatedUser.getEmail());
        user.setPhone(updatedUser.getPhone());

        // Only update password if provided
        if (updatedUser.getPassword() != null && !updatedUser.getPassword().isBlank()) {
            user.setPassword(encoder.encode(updatedUser.getPassword()));
        }

        repo.save(user);

        return ResponseEntity.status(HttpStatus.CREATED)
                .body("User updated successfully");
    }

    @GetMapping("/users/delete/{id}")
    public ResponseEntity<?> deleteUser(
            @PathVariable Long id) {
        User user = repo.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));
        user.setVoided(1);
        repo.save(user);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body("User deleted successfully");
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

    @GetMapping("/users")
    public ResponseEntity<List<User>> userList() {
        List<User> users = userService.getAll();
        return ResponseEntity.ok(users);  // Spring Boot automatically converts to JSON
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(
            @Valid @RequestBody LoginRequest request
    ) {
        User user = userService.authenticate(request.getEmail(), request.getPassword());
        return ResponseEntity.ok("Login successful for " + user.getEmail());
    }
}
