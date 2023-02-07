package com.ssafy.floraserver.db.repository;

import com.ssafy.floraserver.db.entity.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface ProductRepository extends JpaRepository<Product, Long> {

    @Query("select distinct p from Product p where p.sId.sId = :sId")
    Page<Product> findAllBySId(@Param("sId") Long sId, Pageable pageable);
}
