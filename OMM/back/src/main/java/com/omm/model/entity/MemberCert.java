package com.omm.model.entity;

import lombok.Data;

import javax.persistence.*;

@Entity
@Data
@Table(name = "membercert")
public class MemberCert {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "cert_id")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "member_id", nullable = false)
    private Member member;

    @Column(name = "university", nullable = false)
    private boolean university;

    @Column(name = "job", nullable = false)
    private boolean job;

    @Column(name = "certificate", nullable = false)
    private boolean certificate;

    @Column(name = "health", nullable = false)
    private boolean health;

    @Column(name = "estate", nullable = false)
    private boolean estate;

    @Column(name = "income", nullable = false)
    private boolean income;
}
