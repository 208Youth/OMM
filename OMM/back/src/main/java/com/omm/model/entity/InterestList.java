package com.omm.model.entity;

import lombok.Data;

import javax.persistence.*;

@Entity
@Data
@Table(name = "interestlist")
public class InterestList {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "interest_list_id")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "interest_id", nullable = false)
    private Interest interest;

    @ManyToOne
    @JoinColumn(name = "member_id", nullable = false)
    private Member member;
}
