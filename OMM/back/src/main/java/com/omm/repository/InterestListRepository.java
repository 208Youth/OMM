package com.omm.repository;

import com.omm.model.entity.Interest;
import com.omm.model.entity.InterestList;
import com.omm.model.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface InterestListRepository extends JpaRepository<InterestList, Long> {

    List<InterestList> findAllByMember(Member member);

    Optional<InterestList> findById(Long interestListId);

    Optional<InterestList> findByMemberAndInterest(Member member, Interest interest);

}
