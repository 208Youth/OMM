package com.cc24.repository.health;

import com.cc24.model.entity.health.Health;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.Optional;

public interface HealthRepository extends JpaRepository<Health, Long> {
    Optional<Health> findByNameAndBirthDateAndGender(String name, LocalDate birthDate, String gender);
}
