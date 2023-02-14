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
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.Map;

@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/v1/reviews")
public class ReviewController {

    private final ReviewService reviewService;

    @GetMapping("/stores/{sId}")
//    @PreAuthorize("hasRole('ROLE_STORE')")
    public Page<StoreReviewRes> findReviewListByStore(@PathVariable("sId") Long sId, Pageable pageable){

        Page<StoreReviewRes> reviewList = reviewService.findReviewListByStore(sId, pageable);

        return reviewList;
    }

    @GetMapping("/users")
//    @PreAuthorize("hasRole('ROLE_CUSTOMER')")
    public Page<UserReviewRes> findReviewListByUser(Pageable pageable){
        Map<String, String> authInfo = SecurityUtil.getCurrentUser();
        Page<UserReviewRes> reviewList = reviewService.findReviewListByUser(pageable, authInfo);

        return reviewList;
    }

    @PostMapping
//    @PreAuthorize("hasRole('ROLE_CUSTOMER')")
    public ResponseEntity<?> createReview(
                                          @RequestPart(value = "file", required = false) MultipartFile file,
                                          @RequestPart("reviewReq") ReviewReq reviewReq){

        Map<String, String> authInfo = SecurityUtil.getCurrentUser();
        reviewService.createReview(reviewReq, file, authInfo);

        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @DeleteMapping("/{revId}")
    public ResponseEntity<?> deleteProduct(@PathVariable("revId") Long revId){
        Map<String, String> authInfo = SecurityUtil.getCurrentUser();
        reviewService.deleteReview(revId, authInfo);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }
}
