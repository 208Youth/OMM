package com.omm.repository;

import com.omm.model.entity.Filtering;
import com.omm.model.entity.Member;
import com.omm.model.entity.MyInfo;
import com.omm.recommend.model.dto.RecommendDto;
import com.omm.util.CommonMethods;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface MyInfoRepository extends JpaRepository<MyInfo, Long> {

    Optional<MyInfo> findByMember(Member member);

//    @Query(value = "select mem.id as id, mem.age as age, myi.height as height," +
//            "(FUNCTION('acos', (FUNCTION('sin', :#{#myInfo.lat}) ) * (FUNCTION('sin', myi.lat)) + FUNCTION('cos', :#{#myInfo.lat}) * FUNCTION('cos', myi.lat) * FUNCTION('cos', myi.lng - :#{#myInfo.lng}))) * 6371 as distance," +
//            "myi.contactStyle as contactStyle, myi.drinkingStyle as drinkingStyle, myi.smokingStyle as smokingStyle " +
//            "from MyInfo myi inner join Member mem on myi.member.id = mem.id " +
//            "where mem.age between :#{#filtering.ageMin} and :#{#filtering.ageMax} and myi.height between  :#{#filtering.heightMin} and :#{#filtering.heightMax} and distance between :#{#filtering.rangeMin} and :#{#filtering.rangeMax} " +
//            "and myi.member != :#{#myInfo.member} and not exists (select 1 from Favor f where f.fromMember = :#{#myInfo.member} and f.toMember = myi.member )" +
//            "limit 200 ")
//    List<RecommendDto> filteredMembers(@Param("myInfo") MyInfo myInfo, @Param("filtering") Filtering filtering);
//
//    @Query(value = "select mem.id as id, mem.age as age, myi.height as height," +
//            "(FUNCTION('acos', (FUNCTION('sin', :#{#myInfo.lat}) ) * (FUNCTION('sin', myi.lat)) + FUNCTION('cos', :#{#myInfo.lat}) * FUNCTION('cos', myi.lat) * FUNCTION('cos', myi.lng - :#{#myInfo.lng}))) * 6371 as distance," +
//            "myi.contactStyle as contactStyle, myi.drinkingStyle as drinkingStyle, myi.smokingStyle as smokingStyle " +
//            "from MyInfo myi inner join Member mem on myi.member.id = mem.id " +
//            "where myi.member != :#{#myInfo.member} and not exists (select 1 from Favor f where f.fromMember = :#{#myInfo.member} and f.toMember = myi.member )" +
//            "limit 200 ")
//    List<RecommendDto> findByFiltering2(@Param("myInfo") MyInfo myInfo, @Param("filtering") Filtering filtering);
//
//    @Query(value = "select mem.id as id, mem.age as age, myi.height as height," +
//            "(FUNCTION('acos', (FUNCTION('sin', :#{#myInfo.lat}) ) * (FUNCTION('sin', myi.lat)) + FUNCTION('cos', :#{#myInfo.lat}) * FUNCTION('cos', myi.lat) * FUNCTION('cos', myi.lng - :#{#myInfo.lng}))) * 6371 as distance," +
//            "myi.contactStyle as contactStyle, myi.drinkingStyle as drinkingStyle, myi.smokingStyle as smokingStyle " +
//            "from MyInfo myi inner join Member mem on myi.member.id = mem.id " +
//            "where myi.member != :#{#myInfo.member} " +
//            "limit 200 ")
//    List<RecommendDto> findByFiltering3(@Param("myInfo") MyInfo myInfo, @Param("filtering") Filtering filtering);

}
