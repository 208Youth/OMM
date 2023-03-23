package com.cc24.repository.university;

import com.cc24.model.entity.university.Student;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.Optional;

public interface StudentRepository extends JpaRepository<Student, Long> {
    Optional<Student> findByNameAndBirthDateAndGender(String name, LocalDate birthDate, String gender);
}
