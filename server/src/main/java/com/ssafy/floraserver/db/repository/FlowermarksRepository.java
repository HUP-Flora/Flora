package com.ssafy.floraserver.db.repository;

import com.ssafy.floraserver.db.entity.Bookmark;
import com.ssafy.floraserver.db.entity.Store;
import com.ssafy.floraserver.db.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface FlowermarksRepository extends JpaRepository<Bookmark, Long> {
    @Query(value = "select count(b.bId) from Bookmark b " +
            "where b.uId.uId = :uId and b.sId.sId = :sId")
    int countByUIdAndSId(@Param("uId") Long uId, @Param("sId") Long sId);

    @Query(value = "select b from Bookmark b " +
            "where b.uId.uId = :uId and b.sId.sId = :sId")
    Optional<Bookmark> findByUIdAndSId(@Param("uId") Long uId, @Param("sId") Long sId);

    @Query(value = "delete from Bookmark b where b.uId.uId = :uId and b.sId.sId = :sId")
    String deleteByUIdAndSId(@Param("uId") Long uId, @Param("sId") Long sId);
}

