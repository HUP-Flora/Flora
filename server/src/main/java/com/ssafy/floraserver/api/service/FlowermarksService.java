package com.ssafy.floraserver.api.service;

import com.ssafy.floraserver.common.exception.CustomException;
import com.ssafy.floraserver.common.exception.ErrorCode;
import com.ssafy.floraserver.db.entity.Bookmark;
import com.ssafy.floraserver.db.entity.Store;
import com.ssafy.floraserver.db.entity.User;
import com.ssafy.floraserver.db.repository.FlowermarksRepository;
import com.ssafy.floraserver.db.repository.StoreRepository;
import com.ssafy.floraserver.db.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Slf4j
@Transactional
@RequiredArgsConstructor
public class FlowermarksService {

    private final FlowermarksRepository flowermarksRepository;
    private final UserRepository userRepository;
    private final StoreRepository storeRepository;

    public boolean checkDuplicate(Long uId, Long sId) {
        int check = flowermarksRepository.countByUIdAndSId(uId, sId);
        if(check >= 1) return true;
        else return false;
    }

    public void createFlowermark(Long uId, Long sId) {
        User user = userRepository.findById(uId)
                .orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND));
        Store store = storeRepository.findById(sId)
                .orElseThrow(() -> new CustomException(ErrorCode.STORE_NOT_FOUND));
        Bookmark bookmark = new Bookmark(user, store);
        flowermarksRepository.save(bookmark);
    }

    public void deleteFlowermark(Long uId, Long sId) {
        Bookmark bookmark = flowermarksRepository.findByUIdAndSId(uId, sId)
                .orElseThrow(() -> new CustomException(ErrorCode.BOOKMARK_NOT_FOUND));
        flowermarksRepository.deleteById(bookmark.getBId());
    }

    public Page<Bookmark> findFlowermarks(Long uId, Pageable pageable) {
        Page<Bookmark> bookmarkList = flowermarksRepository.findAllByUId(uId, pageable);
        return bookmarkList;
    }

    public void deleteFlowermarks(Long uId){

        flowermarksRepository.deleteAllByUId(uId);
    }
}
