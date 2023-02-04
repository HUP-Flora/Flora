package com.ssafy.floraserver.db.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.ssafy.floraserver.db.entity.User;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByEmail(String email);
}
