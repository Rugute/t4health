package com.t4health.signs.model;

import jakarta.persistence.*;

import java.util.Date;

@Entity
@Table(name = "visits")
public class Visit {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private int patientId;
    private Date visitDate;
    private Date createdOn;
    private int createdBy;
}
