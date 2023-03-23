package com.omm.member.repository;

import com.omm.model.entity.MyInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MyInfoRepository extends JpaRepository<MyInfo, Long> {
}
