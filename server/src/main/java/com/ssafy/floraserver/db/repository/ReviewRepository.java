package com.ssafy.floraserver.db.repository;

import com.ssafy.floraserver.db.entity.Review;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;

public interface ReviewRepository extends JpaRepository<Review, Long> {

    @Query("select distinct r from Review r where r.sId.sId = :sId") // join fetch r.uId
    Page<Review> findAllBySId(@Param("sId") Long sId, Pageable pageable);

    @Query("select distinct r from Review r where r.uId.uId = :uId") // join fetch r.uId
    Page<Review> findAllByUId(@Param("uId") Long uId, Pageable pageable);
}
