package com.ssafy.floraserver.db.repository;

import com.ssafy.floraserver.db.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface OrderRepository extends JpaRepository<Order, Long> {

    @Query(value = "select o from Order o " +
            "join fetch o.sId store " +
            "join fetch o.pId product " +
            "where o.oId = :oId")
    Optional<Order> findById(long oId);

}
