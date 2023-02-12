package com.ssafy.floraserver.db.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.ssafy.floraserver.db.entity.User;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {

    @Query("select distinct u from User u where u.uId = :uId and u.softDelete = false")
    Optional<User> findById(Long uId);

    Optional<User> findByEmail(String email);
}
