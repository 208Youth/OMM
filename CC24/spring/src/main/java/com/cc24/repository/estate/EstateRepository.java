package com.cc24.repository.estate;

import com.cc24.model.entity.estate.Estate;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;

public interface EstateRepository extends JpaRepository<Estate, Long> {
    List<Estate> findByNameAndBirthDateAndGender(String name, LocalDate birthDate, String gender);
}
