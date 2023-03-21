package com.omm.model.entity;

import lombok.Data;

import javax.persistence.*;

@Entity
@Data
@Table(name = "languagelist")
public class LanguageList {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "language_list_id")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "language_id", nullable = false)
    private Language language;

    @ManyToOne
    @JoinColumn(name = "member_id", nullable = false)
    private Member member;
}
