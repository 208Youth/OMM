package com.omm.model.entity;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.omm.model.entity.Member;
import com.omm.model.entity.enums.InfoContactStyle;
import com.omm.model.entity.enums.InfoDrinkingStyle;
import com.omm.model.entity.enums.InfoSmokingStyle;
import lombok.*;
import org.hibernate.annotations.DynamicInsert;

import javax.persistence.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@DynamicInsert
@Table(name = "recommenddto")
public class RecommendDto {

    @Id
    @Column(name = "member_id")
    private Long memberId;

    @Column(name = "age")
    private short age;

    @Column(name = "height")
    private short height;

    @Column(name = "distance")
    private double distance;

    @Column(name = "contact_style", nullable = false)
    @Enumerated(EnumType.STRING)
    private InfoContactStyle contactStyle;

    @Column(name = "drinking_style", nullable = false)
    @Enumerated(EnumType.STRING)
    private InfoDrinkingStyle drinkingStyle;

    @Column(name = "smoking_style", nullable = false)
    @Enumerated(EnumType.STRING)
    private InfoSmokingStyle smokingStyle;

}
