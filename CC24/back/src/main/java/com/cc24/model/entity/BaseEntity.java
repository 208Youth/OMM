package com.cc24.model.entity;

import javax.persistence.Column;
import javax.persistence.MappedSuperclass;
import java.util.Date;

@MappedSuperclass
public abstract class BaseEntity {
    @Column(name="name")
    private String name;

    @Column(name="birth_date")
    private Date birthDate;
}

