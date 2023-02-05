package com.ssafy.floraserver.db.repository;

import com.ssafy.floraserver.db.entity.Product;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Long> {

    @Query("select distinct p from Product p where p.sId.sId = :sId")
    List<Product> findAllBySId(@Param("sId") Long sId, Pageable pageable);
}
