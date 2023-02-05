package com.ssafy.floraserver.api.controller;

import com.ssafy.floraserver.api.response.StoreReviewRes;
import com.ssafy.floraserver.api.response.UserReviewRes;
import com.ssafy.floraserver.api.service.ReviewService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/api/reviews")
public class ReviewController {

    private final ReviewService reviewService;

    @GetMapping("/stores/{sId}")
    public List<StoreReviewRes> findReviewListByStore(@PathVariable("sId") Long sId, Pageable pageable){

        List<StoreReviewRes> reviewList = reviewService.findReviewListByStore(sId, pageable);

        return reviewList;
    }

    @GetMapping("/users/{uId}")
    public List<UserReviewRes> findReviewListByUser(@PathVariable("uId") Long uId, Pageable pageable){

        List<UserReviewRes> reviewList = reviewService.findReviewListByUser(uId, pageable);

        return reviewList;
    }
}