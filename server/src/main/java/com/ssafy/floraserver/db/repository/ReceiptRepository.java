package com.ssafy.floraserver.db.repository;

import com.ssafy.floraserver.db.entity.Receipt;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface ReceiptRepository extends JpaRepository<Receipt, Long> {

    @Query("select r from Receipt r where r.oId.oId = :oId")
    Receipt findByOId(@Param("oId") Long oId);
}
