package com.omm.repository;

import com.omm.exception.member.MemberRuntimeException;
import com.omm.model.entity.Member;
import com.omm.model.entity.MemberImg;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MemberImgRepository extends JpaRepository<MemberImg, Long> {

    List<MemberImg> findAllByMember(Member member);

    MemberImg findFirstByMember(Member member);

}
