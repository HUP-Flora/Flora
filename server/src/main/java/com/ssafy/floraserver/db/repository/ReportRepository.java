package com.ssafy.floraserver.db.repository;

import com.ssafy.floraserver.db.entity.Report;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface ReportRepository extends JpaRepository<Report, Long> {

    @Query("select r from Report r where r.oId.oId = :oId")
    Optional<Report> findByOId(Long oId);
}
