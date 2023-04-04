package com.omm.model.entity;

import com.omm.model.entity.enums.FilterContactStyle;
import com.omm.model.entity.enums.FilterDrinkingStyle;
import com.omm.model.entity.enums.FilterSmokingStyle;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.DynamicInsert;

import javax.persistence.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@DynamicInsert
@Table(name = "filtering")
public class Filtering {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "filtering_id")
    private Long id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id", nullable = false, unique = true)
    private Member member;

    @Column(name = "age_min", nullable = false)
    @ColumnDefault("18")
    private int ageMin;

    @Column(name = "age_max", nullable = false)
    @ColumnDefault("100")
    private int ageMax;

    @Column(name = "height_min", nullable = false)
    @ColumnDefault("140")
    private int heightMin;

    @Column(name = "height_max", nullable = false)
    @ColumnDefault("300")
    private int heightMax;

    @Column(name = "range_min")
    @ColumnDefault("0")
    private int rangeMin;

    @Column(name = "range_max", nullable = false)
    @ColumnDefault("1000")
    private int rangeMax;

    @Column(name = "contact_style", nullable = false)
    @Enumerated(EnumType.STRING)
    @ColumnDefault("'NONE'")
    private FilterContactStyle contactStyle;

    @Column(name = "drinking_style", nullable = false)
    @Enumerated(EnumType.STRING)
    @ColumnDefault("'NONE'")
    private FilterDrinkingStyle drinkingStyle;

    @Column(name = "smoking_style", nullable = false)
    @Enumerated(EnumType.STRING)
    @ColumnDefault("'NONE'")
    private FilterSmokingStyle smokingStyle;

}
