package com.cc24.repository.job;

import com.cc24.model.entity.job.Employee;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Date;
import java.util.Optional;

public interface EmployeeRepository extends JpaRepository<Employee, Long> {
    Optional<Employee> findByNameAndBirthDate(String name, Date birthDate);
}
