package com.cc24.repository.certificate;

import com.cc24.model.entity.certificate.Certificate;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CertificateRepository extends JpaRepository<Certificate, Long> {
}
