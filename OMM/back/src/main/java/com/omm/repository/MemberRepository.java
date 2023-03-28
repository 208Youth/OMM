package com.omm.repository;

import com.omm.model.entity.Member;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface MemberRepository extends JpaRepository<Member, Long> {
    @EntityGraph(attributePaths = "authorities")

    Optional<Member> findOneWithAuthoritiesByDidAddress(String didAddress);

    Optional<Member> findById(Long id);

    Optional<Member> findByDidAddress (String didAddress);

    boolean existsByNickname(String nickname);
}
