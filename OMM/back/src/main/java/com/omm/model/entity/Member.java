package com.omm.model.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import java.util.Set;
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
    private boolean isBlack = false;

    @Column(name = "nickname", nullable = false, unique = true)
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

    @ManyToMany
    @JoinTable(
        name = "member_authority",
        joinColumns = {@JoinColumn(name = "member_id", referencedColumnName = "member_id")},
        inverseJoinColumns = {@JoinColumn(name = "authority_name", referencedColumnName = "authority_name")}
    )
    private Set<Authority> authorities;

}
