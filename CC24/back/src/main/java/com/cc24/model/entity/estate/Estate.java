package com.cc24.model.entity.estate;

import com.cc24.model.entity.BaseEntity;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor
public class Estate extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="estate_id")
    private Long id;

    @Column(name="amount", nullable = false)
    private Long amount;
}
