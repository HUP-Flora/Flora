package com.ssafy.floraserver.db.repository;

import com.ssafy.floraserver.db.entity.Product;
import com.ssafy.floraserver.db.entity.Review;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;
import java.util.Optional;

public interface ReviewRepository extends JpaRepository<Review, Long> {

    @Query(value = "select distinct r from Review r join fetch r.uId where r.sId.sId = :sId and r.softDelete = false",
            countQuery = "select count(r) from Review r") // join fetch r.uId
    Page<Review> findAllBySId(@Param("sId") Long sId, Pageable pageable);

    @Query(value = "select distinct r from Review r join fetch r.uId where r.uId.uId = :uId and r.softDelete = false",
            countQuery = "select count(r) from Review r") // join fetch r.uId
    Page<Review> findAllByUId(@Param("uId") Long uId, Pageable pageable);

    @Query(value = "select distinct r from Review r where r.revId = :revId and r.softDelete = false",
            countQuery = "select count(r) from Review r")
    Optional<Review> findById(Long revId);
}
