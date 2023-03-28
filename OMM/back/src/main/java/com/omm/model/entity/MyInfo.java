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

    @OneToOne
    @JoinColumn(name = "member_id", nullable = false)
    private Member member;

    @Column(name = "lat")
    private float lat;

    @Column(name = "lng")
    private float lng;

    @Column(name = "height", nullable = false)
    private short height;

    @Column(name = "contact_sytle", nullable = false)
    @Enumerated(EnumType.STRING)
    private InfoContactStyle contactStyle;

    @Column(name = "drinking_style", nullable = false)
    @Enumerated(EnumType.STRING)
    private InfoDrinkingStyle drinkingStyle;

    @Column(name = "smoking_style", nullable = false)
    @Enumerated(EnumType.STRING)
    private InfoSmokingStyle smokingStyle;

    @Column(name = "military", nullable = false)
    @Enumerated(EnumType.STRING)
    private InfoMilitary military;

    @Column(name = "pet")
    @Enumerated(EnumType.STRING)
    @ColumnDefault("'NOT'")
    private InfoPet pet;

    @Column(name = "mbti")
    @Enumerated(EnumType.STRING)
    private InfoMBTI mbti;

    @Column(name = "pr")
    @ColumnDefault("''")
    private String pr;
}
