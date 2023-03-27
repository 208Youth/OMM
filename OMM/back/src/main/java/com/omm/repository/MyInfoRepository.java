package com.omm.repository;

import com.omm.model.entity.Member;
import com.omm.model.entity.MyInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface MyInfoRepository extends JpaRepository<MyInfo, Long> {

    Optional<MyInfo> findByMember(Member member);

//    List<MyInfo> findAllByAgeBetweenAndHeightBetween();

}
