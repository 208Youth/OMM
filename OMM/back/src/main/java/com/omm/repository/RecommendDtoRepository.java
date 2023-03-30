package com.omm.repository;

import com.omm.member.model.dto.LikedMemberDto;
import com.omm.model.entity.Filtering;
import com.omm.model.entity.Member;
import com.omm.model.entity.MyInfo;
import com.omm.model.entity.RecommendDto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.security.core.parameters.P;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RecommendDtoRepository extends JpaRepository <RecommendDto, Long> {

    @Query(value = "select mem.member_id as member_id, mem.age as age, myi.height as height," +
            " round(ST_Distance_Sphere(point(myi.lng, myi.lat), point(:#{#myInfo.lng}, :#{#myInfo.lat}))/1000,3) as distance," +
            "myi.contact_style as contact_style, myi.drinking_style as drinking_style, myi.smoking_style as smoking_style " +
            "from myinfo myi inner join member mem on myi.member_id = mem.member_id " +
            "where mem.age between :#{#filtering.ageMin} and :#{#filtering.ageMax} and myi.height between  :#{#filtering.heightMin} and :#{#filtering.heightMax} " +
            "and round(ST_Distance_Sphere(point(myi.lng, myi.lat), point(:#{#myInfo.lng}, :#{#myInfo.lat}))/1000,3) between :#{#filtering.rangeMin} and :#{#filtering.rangeMax} " +
            "and myi.member_id != :#{#myInfo.member.id} and mem.gender != :#{#myInfo.member.gender} "
            + "and not exists (select 1 from favor f where f.from_id = :#{#myInfo.member.id} and f.to_id = myi.member_id) "
            + "limit 200"
            , nativeQuery = true)
    List<RecommendDto> filteredMembers(@Param("myInfo")MyInfo myInfo, @Param("filtering")Filtering filtering);

    @Query(value = "select mem.member_id as member_id, mem.age as age, myi.height as height," +
            " round(ST_Distance_Sphere(point(myi.lng, myi.lat), point(:#{#myInfo.lng}, :#{#myInfo.lat}))/1000,3) as distance," +
            "myi.contact_style as contact_style, myi.drinking_style as drinking_style, myi.smoking_style as smoking_style " +
            "from myinfo myi inner join member mem on myi.member_id = mem.member_id " +
            "where myi.member_id != :#{#myInfo.member.id} and mem.gender != :#{#myInfo.member.gender} "
            + "and not exists (select 1 from favor f where f.from_id = :#{#myInfo.member.id} and f.to_id = myi.member_id "
            + "limit 200"
            , nativeQuery = true)
    List<RecommendDto> filteredMembers2(@Param("myInfo")MyInfo myInfo);

    @Query(value = "select mem.member_id as member_id, mem.age as age, myi.height as height," +
            " round(ST_Distance_Sphere(point(myi.lng, myi.lat), point(:#{#myInfo.lng}, :#{#myInfo.lat}))/1000,3) as distance," +
            "myi.contact_style as contact_style, myi.drinking_style as drinking_style, myi.smoking_style as smoking_style " +
            "from myinfo myi inner join member mem on myi.member_id = mem.member_id " +
            "where myi.member_id != :#{#myInfo.member.id} and mem.gender != :#{#myInfo.member.gender} "
            + "limit 200"
            , nativeQuery = true)
    List<RecommendDto> filteredMembers3(@Param("myInfo")MyInfo myInfo);


//    @Query(value = "select new com.omm.member.model.dto.LikedMemberDto( m.id, m.nickname, m.age, " +
//            "(select mi.imageContent from MemberImg mi where mi.member.id = m.id limit 1)) " +
//            "from Member m left outer join Favor f on f.fromMember.id = :memberId " +
//            "where f.toMember.id = m.id and f.value = true")
//    List<LikedMemberDto> getLikedMembers(@Param("memberId") Long memberId);

}
