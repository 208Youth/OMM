package com.omm.member.repository;

import com.omm.model.entity.MemberImg;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MemberImgRepository extends JpaRepository<MemberImg, Long> {

    List<MemberImg> findAllById(Long memberId);
}
