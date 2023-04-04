package com.cc24.repository.income;

import com.cc24.model.entity.income.Income;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.Optional;

public interface IncomeRepository extends JpaRepository<Income, Long> {
    Optional<Income> findByNameAndBirthDateAndGender(String name, LocalDate birthDate, String gender);
}
