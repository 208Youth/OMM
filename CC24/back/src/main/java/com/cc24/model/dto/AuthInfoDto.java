package com.cc24.model.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.time.LocalDate;

@Getter
@AllArgsConstructor
public class AuthInfoDto {
    String name;
    LocalDate birthDate;
    String gender;
}
