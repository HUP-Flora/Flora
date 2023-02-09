package com.ssafy.floraserver.db.repository;

import com.ssafy.floraserver.db.entity.Conference;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ConferenceRepository extends JpaRepository<Conference, Long> {
}
