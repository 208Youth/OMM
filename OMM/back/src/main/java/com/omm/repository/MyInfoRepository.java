package com.omm.repository;

import com.omm.model.entity.Filtering;
import com.omm.model.entity.Member;
import com.omm.model.entity.MyInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface MyInfoRepository extends JpaRepository<MyInfo, Long> {

    Optional<MyInfo> findByMember(Member member);

//    @Query(value = "select * from MyInfo myi inner join Member mem")
//    List<MyInfo> findByFiltering(@Param("id") Long id, @Param("filtering") Filtering filtering);

}
