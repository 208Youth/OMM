package com.cc24.model.entity.certificate;

import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor
public class Certificate {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="certificate_id")
    private Long id;

    @Column(name="name", nullable = false)
    private String name;
}
