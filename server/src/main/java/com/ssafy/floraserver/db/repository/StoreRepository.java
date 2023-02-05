package com.ssafy.floraserver.db.repository;

import com.ssafy.floraserver.db.entity.Store;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface StoreRepository extends JpaRepository<Store, Long> {

    @Query("select distinct s from Store s join fetch s.start join fetch s.end where s.sido = :sido and s.gugun = :gugun and s.dong = :dong")
    List<Store> findAllBySidoAndGugunAndDong(@Param("sido") String sido, @Param("gugun") String gugun, @Param("dong") String dong, Pageable pageable);
}
