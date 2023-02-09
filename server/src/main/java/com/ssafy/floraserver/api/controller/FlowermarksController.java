package com.ssafy.floraserver.api.controller;

import com.ssafy.floraserver.api.response.BookmarkStoreRes;
import com.ssafy.floraserver.api.service.FlowermarksService;
import com.ssafy.floraserver.common.util.SecurityUtil;
import com.ssafy.floraserver.db.entity.Bookmark;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@Slf4j
@RequestMapping("/v1/flowermarks")
@RequiredArgsConstructor
public class FlowermarksController {

    private final FlowermarksService flowermarksService;

    // 페이징 처리해서 넘기기
    // 가게 이름, 가게 주소, 가게 이미지, 가게 영업 시작, 종료 시각, 전화번호
    @GetMapping("")
//    @PreAuthorize("hasRole('ROLE_CUSTOMER')")
    public Page<BookmarkStoreRes> findFlowerMarks(Pageable pageable) {
        Map<String, String> authInfo = SecurityUtil.getCurrentUser();
        Long uId = Long.parseLong(authInfo.get("uId"));
        Page<Bookmark> bookmarkList = flowermarksService.findFlowermarks(uId, pageable);
        System.out.println(bookmarkList.getContent().get(0).getSId());
        Page<BookmarkStoreRes> bookmarkStoreRes = bookmarkList
                .map(b -> BookmarkStoreRes.builder().bookmark(b).build());
        log.info("고객 번호 {} 에 대한 꽃갈피 목록 출력", uId);
        return bookmarkStoreRes;
    }

    // 가게에 대한 꽃갈피가 있는지 없는지
    @GetMapping("/{sId}")
//    @PreAuthorize("hasRole('ROLE_CUSTOMER')")
    public boolean findFlowermark(@PathVariable("sId") Long sId) {
        Map<String, String> authInfo = SecurityUtil.getCurrentUser();
        Long uId = Long.parseLong(authInfo.get("uId"));
        log.info("고객 번호 {} 의 가게 번호 {} 에 대한 꽃갈피 등록 여부 확인", uId, sId);
        return flowermarksService.checkDuplicate(uId, sId);
    }

    @PostMapping("/{sId}")
//    @PreAuthorize("hasRole('ROLE_CUSTOMER')")
    public ResponseEntity<?> createFlowermark(@PathVariable("sId") Long sId) {
        Map<String, String> authInfo = SecurityUtil.getCurrentUser();
        Long uId = Long.parseLong(authInfo.get("uId"));
        log.info("고객 번호 {} 과 가게 번호 {} 에 대한 꽃갈피 중복 체크", uId, sId);
        boolean checkDuplicate = flowermarksService.checkDuplicate(uId, sId);
        if (!checkDuplicate) {
            flowermarksService.createFlowermark(uId, sId);
            log.info("고객 번호 {} 에 가게 번호 {} 에 대한 꽃갈피 추가 성공", uId, sId);
            return new ResponseEntity<>(HttpStatus.OK);
        } else {
            log.info("고객 번호 {} 에 가게 번호 {} 에 대한 꽃갈피 추가 실패", uId, sId);
            return new ResponseEntity<>(HttpStatus.METHOD_NOT_ALLOWED);
        }
    }

    @DeleteMapping("/{sId}")
//    @PreAuthorize("hasRole('ROLE_CUSTOMER')")
    public ResponseEntity<?> deleteFlowermark(@PathVariable("sId") Long sId) {
        Map<String, String> authInfo = SecurityUtil.getCurrentUser();
        Long uId = Long.parseLong(authInfo.get("uId"));
        log.info("고객 번호 {} 과 가게 번호 {} 에 대한 꽃갈피 삭제 시도", uId, sId);
        try {
            log.info("고객 번호 {} 에 가게 번호 {} 에 대한 꽃갈피 삭제 성공", uId, sId);
            flowermarksService.deleteFlowermark(uId, sId);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception e) {
            log.info("고객 번호 {} 에 가게 번호 {} 에 대한 꽃갈피 삭제 실패", uId, sId);
            return new ResponseEntity<>(HttpStatus.METHOD_NOT_ALLOWED);
        }
    }
}