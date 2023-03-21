package com.cc24.repository.university;

import com.cc24.model.entity.university.Student;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Date;
import java.util.Optional;

public interface StudentRepository extends JpaRepository<Student, Long> {
    Optional<Student> findByNameAndBirthDate(String name, Date birthDate);
}
