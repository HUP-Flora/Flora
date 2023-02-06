package com.ssafy.floraserver.db.repository;

import com.ssafy.floraserver.api.response.StoreRes;
import com.ssafy.floraserver.db.entity.Store;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface StoreRepository extends JpaRepository<Store, Long> {

    @Query("select distinct s from Store s join fetch s.start join fetch s.end where s.region_1depth_name = :region_1depth_name and s.region_2depth_name = :region_2depth_name and s.region_3depth_name = :region_3depth_name")
    List<Store> findAllBySidoAndGugunAndDong(@Param("region_1depth_name") String region_1depth_name, @Param("region_2depth_name") String region_2depth_name, @Param("region_3depth_name") String region_3depth_name, Pageable pageable);


    @Query("select distinct s from Store s join fetch s.start join fetch s.end where s.sId = :sId")
    Optional<Store> findById(@Param("sId") Long sId);

//    // Dto로 바로 조회하기
//    @Query("select new com.ssafy.floraserver.api.response.StoreRes(s.sId, s.name, s.phoneNumber, s.sido, s.gugun, s.dong, s.detailedAddress, s.holiday, s.isOnair, s.start.time, s.end.time, s.bookmarkCnt, s.reviewCnt) from Store s where s.sId = :sId")
//    Optional<StoreRes> findStoreRes(@Param("sId") Long sId);
}
