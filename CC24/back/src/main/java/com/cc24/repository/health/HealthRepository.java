package com.cc24.repository.health;

import com.cc24.model.entity.health.Health;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Date;
import java.util.Optional;

public interface HealthRepository extends JpaRepository<Health, Long> {
    Optional<Health> findByNameAndBirthDate(String name, Date birthDate);
}
