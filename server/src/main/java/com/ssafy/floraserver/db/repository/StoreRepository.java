package com.ssafy.floraserver.db.repository;

import com.ssafy.floraserver.db.entity.Store;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StoreRepository extends JpaRepository<Store, Long> {
}
