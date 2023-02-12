package com.ssafy.floraserver.db.repository;

import com.ssafy.floraserver.api.response.StoreRes;
import com.ssafy.floraserver.db.entity.Bookmark;
import com.ssafy.floraserver.db.entity.Store;
import com.ssafy.floraserver.db.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import javax.transaction.Transactional;
import java.util.List;
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

    @Query(value =  "select b from Bookmark b join fetch b.sId store where b.uId.uId = :uId",
            countQuery = "select count(b) from Bookmark b where b.uId.uId = :uId")
    Page<Bookmark> findAllByUId(@Param("uId") Long uId, Pageable pageable);

    @Modifying
    @Transactional
    @Query("delete from Bookmark b where b.uId.uId = :uId")
    void deleteAllByUId(@Param("uId") Long uId);
}
