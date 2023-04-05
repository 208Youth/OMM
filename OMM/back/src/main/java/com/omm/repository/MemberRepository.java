package com.omm.repository;

import com.omm.model.entity.Member;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface MemberRepository extends JpaRepository<Member, Long> {

    Optional<Member> findById(Long id);

    Optional<Member> findByDidAddress (String didAddress);

    boolean existsByDidAddress(String didAddress);

    @Query(value = "select * from member m left outer join favor f on f.to_id = m.member_id " +
            "where f.from_id = :id and f.value = true ", nativeQuery = true)
    List<Member> getMembersByFavoredInfo(Long id);
}
