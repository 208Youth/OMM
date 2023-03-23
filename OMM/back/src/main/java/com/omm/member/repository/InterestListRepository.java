package com.omm.member.repository;

import com.omm.model.entity.InterestList;
import com.omm.model.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface InterestListRepository extends JpaRepository<InterestList, Long> {

    List<InterestList> findAllByMember(Member member);
}
