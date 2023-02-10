package com.ssafy.floraserver.db.repository;

import com.ssafy.floraserver.db.entity.Bookmark;
import com.ssafy.floraserver.db.entity.Order;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface OrderRepository extends JpaRepository<Order, Long> {

    @Query(value = "select o from Order o " +
            "join fetch o.sId store " +
            "join fetch o.pId product " +
            "where o.oId = :oId")
    Optional<Order> findById(long oId);

    @Query(value = "select o from Order o join fetch o.uId join fetch o.sId where o.sId.sId = :sId",
            countQuery = "select count(o) from Order o where o.sId.sId = :sId")
    Page<Order> findAllByStore(@Param("sId") Long sId, Pageable pageable);

    @Query(value = "select o from Order o join fetch o.uId join fetch o.sId where o.uId.uId = :uId",
            countQuery = "select count(o) from Order o where o.sId.sId = :sId")
    Page<Order> findAllByUser(@Param("uId") Long uId, Pageable pageable);

    @Query("select max(o.oId) from Order o")
    Long findLastOId();

    @Query(value = "select o from Order o " +
            "where o.conId.conId = :conId")
    Optional<Order> findByConId(@Param("conId") Long conId);
}
