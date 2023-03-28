package com.omm.model.entity;

import lombok.*;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.Comment;
import org.hibernate.annotations.DynamicInsert;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@DynamicInsert
@Table(name = "member")
public class Member {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "member_id")
    private Long id;

    @Column(name = "is_black")
    @ColumnDefault("false")
    private boolean isBlack = false;

    @Column(name = "grade")
    @ColumnDefault("'role_user'")
    private String grade = "role_user";

    @Column(name = "nickname", nullable = false, unique = true)
    private String nickname;

    @Column(name = "suspend_date")
    private LocalDate suspendDate;

    @Column(name = "age", nullable = false)
    private short age;

    @Column(name = "gender", nullable = false)
    private String gender;

    @Column(name = "did_address", nullable = false, unique = true)
    private String didAddress;
}
