package com.omm.model.entity;

import com.omm.model.entity.enums.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.DynamicInsert;

import javax.persistence.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@DynamicInsert
@Table(name = "myinfo")
public class MyInfo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "info_id")
    private Long id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id", nullable = false, unique = true)
    private Member member;

    @Column(name = "lat")
    @ColumnDefault("35.20551")
    private float lat;

    @Column(name = "lng")
    @ColumnDefault("126.81150")
    private float lng;

    @Column(name = "height", nullable = false)
    @ColumnDefault("0")
    private short height;

    @Column(name = "contact_style", nullable = false)
    @Enumerated(EnumType.STRING)
    @ColumnDefault("'PREFER_MSG'")
    private InfoContactStyle contactStyle;

    @Column(name = "drinking_style", nullable = false)
    @Enumerated(EnumType.STRING)
    @ColumnDefault("'NOT'")
    private InfoDrinkingStyle drinkingStyle;

    @Column(name = "smoking_style", nullable = false)
    @Enumerated(EnumType.STRING)
    @ColumnDefault("'NOT'")
    private InfoSmokingStyle smokingStyle;

    @Column(name = "military")
    @Enumerated(EnumType.STRING)
    @ColumnDefault("'NONE'")
    private InfoMilitary military;

    @Column(name = "pet")
    @Enumerated(EnumType.STRING)
    @ColumnDefault("'NOT'")
    private InfoPet pet;

    @Column(name = "mbti")
    @Enumerated(EnumType.STRING)
    @ColumnDefault("'SECRET'")
    private InfoMBTI mbti;

    @Column(name = "pr")
    @ColumnDefault("''")
    private String pr;
}
