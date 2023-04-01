package com.omm.repository;

import com.omm.model.entity.Filtering;
import com.omm.model.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface FilteringRepository extends JpaRepository<Filtering, Long> {
    Optional<Filtering> findByMember(Member member);
}
