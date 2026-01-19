package com.t4health.signs.controllers;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class SymptomController {
    @PostMapping("/symptoms")
    public Map<String, Object> submitSymptom(@RequestBody Map<String, String> payload) {
        String symptom = payload.get("symptom");

        Map<String, Object> response = new HashMap<>();
        response.put("message", "Symptom received successfully!");
        response.put("yourSymptom", symptom);
        response.put("advice", "Consult a doctor if persists.");

        return response;
    }
}
