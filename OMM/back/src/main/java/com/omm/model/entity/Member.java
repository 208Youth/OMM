package com.omm.model.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.omm.model.entity.enums.Authority;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;
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

    @JsonIgnore
    @Column(name = "is_black")
    @ColumnDefault("false")
    private boolean isBlack;

    @Column(name = "nickname")
    private String nickname;

    @JsonIgnore
    @Column(name = "suspend_date")
    private LocalDate suspendDate;

    @Column(name = "age", nullable = false)
    private short age;

    @Column(name = "gender", nullable = false)
    private String gender;

    @Column(name = "did_address", nullable = false, unique = true)
    private String didAddress;

    @Column(name = "image_url", columnDefinition = "LONGTEXT", nullable = false, unique = true)
    private String imageUrl;

    @Column(name = "authority")
    @Enumerated(EnumType.STRING)
    @ColumnDefault("'ROLE_USER'")
    private Authority authority;

}
