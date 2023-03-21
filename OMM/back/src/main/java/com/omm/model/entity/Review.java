package com.omm.model.entity;

import lombok.Data;

import javax.persistence.*;

@Entity
@Data
@Table(name = "review")
public class Review {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "review_id")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "reviewer_id", nullable = false)
    private Member reviewer;

    @ManyToOne
    @JoinColumn(name = "target_id", nullable = false)
    private Member target;

    @Column(name = "content", nullable = false)
    private String content;
}
