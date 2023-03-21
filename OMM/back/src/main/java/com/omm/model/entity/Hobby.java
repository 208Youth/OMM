package com.omm.model.entity;

import lombok.Data;

import javax.persistence.*;

@Entity
@Data
@Table(name = "hobby")
public class Hobby {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "hobby_id")
    private Long id;

    @Column(name = "name", nullable = false)
    private String name;
}
