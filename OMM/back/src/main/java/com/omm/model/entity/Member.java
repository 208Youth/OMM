package com.omm.model.entity;

import lombok.*;
import org.hibernate.annotations.Comment;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
@Data
@Table(name = "member")
public class Member {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "member_id")
    private Long id;

    @Column(name = "address", nullable = false)
    private String address;

    @Column(name = "did_key", nullable = false)
    private String didKey;

    @Column(name = "is_black", nullable = false)
    private boolean isBlack;

    @Column(name = "grade", nullable = false)
    private String grade;

    @Column(name = "nickname", nullable = false)
    private String nickname;

    @Column(name = "suspend_date")
    private LocalDate suspendDate;
}
