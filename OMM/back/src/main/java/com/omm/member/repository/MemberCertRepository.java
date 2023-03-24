package com.omm.member.repository;

import com.omm.model.entity.Member;
import com.omm.model.entity.MemberCert;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface MemberCertRepository extends JpaRepository<MemberCert, Long> {

    Optional<MemberCert> findByMember(Member member);
}
