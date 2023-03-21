package com.omm.model.entity;

import lombok.Data;

import javax.persistence.*;

@Entity
@Data
@Table(name = "hobbylist")
public class HobbyList {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "hobby_list_id")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "hobby_id", nullable = false)
    private Hobby hobby;

    @ManyToOne
    @JoinColumn(name = "member_id", nullable = false)
    private Member member;

}
