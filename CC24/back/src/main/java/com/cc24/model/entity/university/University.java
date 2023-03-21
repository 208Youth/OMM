package com.cc24.model.entity.university;

import lombok.*;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor
public class University {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "university_id")
    private Long id;

    @Column(name = "name", nullable = false)
    private String name;
}
