package com.omm.model.entity;

import lombok.*;
import org.hibernate.annotations.Comment;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "member")
public class Member {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "member_id")
    private Long id;

    @Column(name = "is_black", nullable = false)
    private boolean isBlack;

    @Column(name = "grade", nullable = false)
    private String grade;

    @Column(name = "nickname", nullable = false, unique = true)
    private String nickname;

    @Column(name = "suspend_date")
    private LocalDate suspendDate;
}
