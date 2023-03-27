package com.cc24.repository.certificate;

import com.cc24.model.entity.certificate.Authenticator;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.Optional;

public interface AuthenticatorRepository extends JpaRepository<Authenticator, Long> {
    Optional<Authenticator> findByNameAndBirthDateAndGender(String name, LocalDate birthDate, String gender);
}