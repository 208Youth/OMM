package com.omm.model.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "favor")
public class Favor {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "favor_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "from_id", nullable = false)
    private Member fromMember;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "to_id", nullable = false)
    private Member toMember;

    @Column(name = "value", nullable = false)
    private boolean value;
}
