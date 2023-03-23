package com.omm.member.repository;

import com.omm.model.entity.Filtering;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FilteringRepository extends JpaRepository<Filtering, Long> {
}
