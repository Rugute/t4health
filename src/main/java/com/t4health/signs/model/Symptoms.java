package com.t4health.signs.model;

import jakarta.persistence.*;

@Entity
@Table(name = "symptoms")
public class Symptoms {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

}
