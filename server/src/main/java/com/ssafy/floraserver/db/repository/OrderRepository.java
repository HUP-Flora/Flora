package com.ssafy.floraserver.db.repository;

import com.ssafy.floraserver.db.entity.Bookmark;
import com.ssafy.floraserver.db.entity.Order;
import com.ssafy.floraserver.db.entity.TimeUnit;
import com.ssafy.floraserver.db.entity.enums.ConferenceStatus;
import com.ssafy.floraserver.db.entity.enums.OrderStatus;
import com.ssafy.floraserver.db.entity.enums.OrderType;
import org.aspectj.weaver.ast.Or;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.Optional;

public interface OrderRepository extends JpaRepository<Order, Long> {

    @Query(value = "select o from Order o " +
            "join fetch o.sId store " +
            "join fetch o.pId product " +
            "where o.oId = :oId")
    Optional<Order> findById(long oId);

    @Query(value = "select o from Order o " +
            "join fetch o.uId " +
            "join fetch o.sId " +
            "where o.sId.sId = :sId and o.recId is not null",
            countQuery = "select count(o) from Order o where o.sId.sId = :sId")
    Page<Order> findAllByStore(@Param("sId") Long sId, Pageable pageable);

    @Query(value = "select o from Order o " +
            "join fetch o.uId " +
            "join fetch o.sId " +
            "where o.uId.uId = :uId and o.recId is not null",
            countQuery = "select count(o) from Order o where o.sId.sId = :sId")
    Page<Order> findAllByUser(@Param("uId") Long uId, Pageable pageable);

    @Query("select max(o.oId) from Order o")
    Long findLastOId();

    @Query(value = "select o from Order o " +
            "where o.conId.conId = :conId")
    Optional<Order> findByConId(@Param("conId") Long conId);

    @Query(value = "select o from Order o where o.num = :num")
    Optional<Order> findByNum(@Param("num") String num);

    @Query(value = "select o from Order o " +
            "join fetch o.conId Conference " +
            "where o.conId.reservationDate = :date and o.sId.sId = :sId " +
            "and o.conId.reservationTime.tuId >= :start " +
            "and o.conId.reservationTime.tuId < :end")
    List<Order> findByDateAndSId(LocalDate date, Long sId, Long start, Long end);

    @Query(value = "select o from Order o " +
            "join fetch o.sId store " +
            "join fetch o.pId product " +
            "join fetch o.conId conference " +
            "where o.uId.uId = :uId and o.status = :status",
            countQuery = "select count(o) from Order o where o.uId.uId = :uId and o.status = :status")
    Page<Order> findByUId(@Param("uId") Long uId, OrderStatus status, Pageable pageable);

    @Query(value = "select o from Order o " +
            "join fetch o.sId store " +
            "join fetch o.pId product " +
            "where o.sId.sId = :sId and o.status = :status and o.type = :type",
            countQuery = "select count(o) from Order o")
    Page<Order> findBySId(@Param("sId") Long sId, OrderStatus status, OrderType type, Pageable pageable);

    @Query(value = "select o from Order o " +
            "join fetch o.sId store " +
            "join fetch o.pId product " +
            "join fetch o.conId conference " +
            "where o.uId.uId = :uId and o.conId.status = :conferenceStatus " +
            "and o.status = :orderStatus " +
            "and :date <= o.conId.reservationDate " +
            "and :time <= o.conId.reservationTime.tuId " +
            "order by o.conId.reservationDate, o.conId.reservationTime.tuId",
            countQuery = "select count(o) from Order o where o.uId.uId = :uId and o.conId.status = :conferenceStatus")
    Page<Order> findByUIdAndConStatus(@Param("uId") Long uId, OrderStatus orderStatus, ConferenceStatus conferenceStatus, LocalDate date, Long time, Pageable pageable);

    @Query(value = "select o from Order o " +
            "join fetch o.sId store " +
            "join fetch o.pId product " +
            "join fetch o.conId conference " +
            "where o.sId.sId = :sId " +
            "and o.conId.status = :status " +
            "and :date <= o.conId.reservationDate " +
            "and :time <= o.conId.reservationTime.tuId " +
            "order by o.conId.reservationDate, o.conId.reservationTime.tuId",
            countQuery = "select count(o) from Order o where o.sId.sId = :sId and o.conId.status = :status")
    Page<Order> findBySIdAndConStatus(@Param("sId") Long sId, ConferenceStatus status, LocalDate date, Long time, Pageable pageable);

    @Query(value = "select o from Order o " +
            "join fetch o.sId store " +
            "join fetch o.recId receipt " +
            "where o.oId = :oId")
    Optional<Order> findByOId(long oId);

}
