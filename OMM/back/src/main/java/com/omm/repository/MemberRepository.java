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

    @Query(value = "select m.id, m.nickname, m.age from Member m left outer join Favor f on f.toMember.id = m.id " +
            "where f.fromMember.id = :id and f.value = true ")
    List<Member> getMembersByFavoredInfo(Long id);
}
