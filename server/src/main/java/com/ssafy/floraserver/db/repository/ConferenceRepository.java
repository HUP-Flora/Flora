package com.ssafy.floraserver.db.repository;

import com.ssafy.floraserver.db.entity.Bookmark;
import com.ssafy.floraserver.db.entity.Conference;
import com.ssafy.floraserver.db.entity.Review;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface ConferenceRepository extends JpaRepository<Conference, Long> {}
