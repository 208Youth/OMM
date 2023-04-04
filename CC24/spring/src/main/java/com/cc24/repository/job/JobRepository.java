package com.cc24.repository.job;

import com.cc24.model.entity.job.Job;
import org.springframework.data.jpa.repository.JpaRepository;

public interface JobRepository extends JpaRepository<Job, Long> {
}
