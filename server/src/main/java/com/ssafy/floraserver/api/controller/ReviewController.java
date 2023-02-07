package com.ssafy.floraserver.api.controller;

import com.ssafy.floraserver.api.request.ReviewReq;
import com.ssafy.floraserver.api.response.StoreReviewRes;
import com.ssafy.floraserver.api.response.UserReviewRes;
import com.ssafy.floraserver.api.service.ReviewService;
import com.ssafy.floraserver.common.util.SecurityUtil;
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
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/api/reviews")
public class ReviewController {

    private final ReviewService reviewService;

    @GetMapping("/stores/{sId}")
    @PreAuthorize("hasRole('ROLE_STORE')")
    public Page<StoreReviewRes> findReviewListByStore(@PathVariable("sId") Long sId, Pageable pageable){

        Page<StoreReviewRes> reviewList = reviewService.findReviewListByStore(sId, pageable);

        return reviewList;
    }

    @GetMapping("/users/{uId}")
    @PreAuthorize("hasRole('ROLE_CUSTOMER')")
    public Page<UserReviewRes> findReviewListByUser(@PathVariable("uId") Long uId, Pageable pageable){

        Page<UserReviewRes> reviewList = reviewService.findReviewListByUser(uId, pageable);

        return reviewList;
    }

    @PostMapping
    @PreAuthorize("hasRole('ROLE_CUSTOMER')")
    public ResponseEntity<?> createReview(@RequestBody ReviewReq reviewReq){

        Map<String, String> authInfo = SecurityUtil.getCurrentUser();
        log.info("현재 로그인 {} ", authInfo.toString());
        log.info(reviewReq.toString());
        reviewService.createReview(reviewReq, authInfo);

        // TODO 리뷰 작성 후 주문에 걸기

        return new ResponseEntity<>(HttpStatus.CREATED);
    }
}
