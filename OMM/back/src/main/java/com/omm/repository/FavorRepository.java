package com.omm.repository;

import com.omm.model.entity.Favor;
import com.omm.model.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface FavorRepository extends JpaRepository<Favor, Long> {

    boolean existsByFromMemberAndToMember(Member fromMember, Member toMember);

    Favor findByFromMemberAndToMember(Member fromMember, Member toMember);
}
