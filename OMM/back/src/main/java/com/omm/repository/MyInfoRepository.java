package com.omm.repository;

import com.omm.model.entity.Member;
import com.omm.model.entity.MyInfo;
import com.omm.model.entity.RecommendDto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface MyInfoRepository extends JpaRepository<MyInfo, Long> {

    Optional<MyInfo> findByMember(Member member);

//    @Query(value = "select mem.id as id, mem.age as age, myi.height as height," +
//            "myi.contactStyle as contactStyle, myi.drinkingStyle as drinkingStyle, myi.smokingStyle as smokingStyle " +
//            "from MyInfo myi inner join Member mem on myi.member.id = mem.id " +
//            "where mem.age between :ageMin and :ageMax and myi.height between  :heightMin and :heightMax " +
//            "and myi.member.id != :memberId and not exists (select 1 from Favor f where f.fromMember.id = :memberId and f.toMember.id = myi.member.id )" )
//    List<RecommendDto> filteredMembers(@Param("ageMin") int ageMin, @Param("ageMax") int ageMax, @Param("heightMin") int heightMin, @Param("heightMax") int heightMax,
////                                       @Param("rangeMin") int rangeMin, @Param("rangeMax") int rangeMax,
//                                       @Param("memberId") long memberId
////            , @Param("gender") String gender, @Param("lat") double lat, @Param("lng") double lng
//    );

//    @Query(value = "select mem.id as id, mem.age as age, myi.height as height," +
//            "myi.contactStyle as contactStyle, myi.drinkingStyle as drinkingStyle, myi.smokingStyle as smokingStyle " +
//            "from MyInfo myi inner join Member mem on myi.member.id = mem.id " +
//            "where mem.age between :#{#filtering.ageMin} and :#{#filtering.ageMax} and myi.height between  :#{#filtering.heightMin} and :#{#filtering.heightMax} " +
//            "and myi.member != :#{#myInfo.member} and not exists (select 1 from Favor f where f.fromMember = :#{#myInfo.member} and f.toMember = myi.member )" )
//    List<RecommendDto> filteredMembers(@Param("myInfo") MyInfo myInfo, @Param("filtering") Filtering filtering);


//        @Query(value = "select mem.member_id as id, mem.age as age, myi.height as height," +
//            " ST_Distance_Sphere(point(myi.lng, myi.lat), point(:#{#myInfo.lng}, :#{#myInfo.lat})) as distance," +
//            "myi.contact_style as contactStyle, myi.drinking_style as drinkingStyle, myi.smoking_style as smokingStyle " +
//            "from myinfo myi inner join member mem on myi.member_id = mem.member_id " +
//            "where mem.age between :#{#filtering.ageMin} and :#{#filtering.ageMax} and myi.height between  :#{#filtering.heightMin} and :#{#filtering.heightMax} " +
//                "and ST_Distance_Sphere(point(myi.lng, myi.lat), point(:#{#myInfo.lng}, :#{#myInfo.lat})) between :#{#filtering.rangeMin} and :#{#filtering.rangeMax} "
////            "and myi.member_id != :#{#myInfo.member.id} " +
////                "and not exists (select 1 from favor f where f.fromMember = :#{#myInfo.member} and f.toMember = myi.member " +
////                "limit 200"
//                , nativeQuery = true)
//    List<RecommendDto> filteredMembers(@Param("myInfo") MyInfo myInfo, @Param("filtering") Filtering filtering);

//    @Query(value = "select mem.member_id as id, mem.age as age, myi.height as height," +
////            " ST_Distance_Sphere(point(myi.lng, myi.lat), point(:#{#myInfo.lng}, :#{#myInfo.lat})) as distance," +
//            "myi.contact_style as contactStyle, myi.drinking_style as drinkingStyle, myi.smoking_style as smokingStyle " +
//            "from myinfo myi inner join member mem on myi.member_id = mem.member_id "
//            , nativeQuery = true)
//    List<RecommendDto> filteredMembers();

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
//            "where myi.member != :#{#myInfo.member} and not exists (select 1 from Favor f where f.fromMember = :#{#myInfo.member} and f.toMember = myi.member )")
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
