package com.cc24.repository.certificate;

import com.cc24.model.entity.certificate.Authenticator;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Date;
import java.util.Optional;

public interface AuthenticatorRepository extends JpaRepository<Authenticator, Long> {
    Optional<Authenticator> findByNameAndBirthDate(String name, Date birthDate);
}