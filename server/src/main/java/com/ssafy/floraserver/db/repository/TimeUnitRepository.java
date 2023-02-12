package com.ssafy.floraserver.db.repository;

import com.ssafy.floraserver.db.entity.TimeUnit;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface TimeUnitRepository extends JpaRepository<TimeUnit, Long> {
    @Query(value =  "select t from TimeUnit t where t.time > :time")
    List<TimeUnit> findByTime(String time, Pageable pageable);

}
