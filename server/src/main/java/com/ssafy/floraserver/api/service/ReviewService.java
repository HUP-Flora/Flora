package com.ssafy.floraserver.api.service;

import com.ssafy.floraserver.api.response.StoreReviewRes;
import com.ssafy.floraserver.api.response.UserReviewRes;
import com.ssafy.floraserver.db.entity.Review;
import com.ssafy.floraserver.db.repository.ReviewRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Slf4j
@RequiredArgsConstructor
@Transactional
public class ReviewService {

    private final ReviewRepository reviewRepository;

    public List<StoreReviewRes> findReviewListByStore(Long sId, Pageable pageable) {
        List<Review> reviewList = reviewRepository.findAllBySId(sId, pageable);

        List<StoreReviewRes> storeReviewResList = reviewList.stream()
                .map(s -> StoreReviewRes.builder().review(s).build())
                .collect(Collectors.toList());

        return storeReviewResList;
    }

    public List<UserReviewRes> findReviewListByUser(Long uId, Pageable pageable) {
        List<Review> reviewList = reviewRepository.findAllByUId(uId, pageable);

        List<UserReviewRes> reviewResList = reviewList.stream()
                .map(u -> UserReviewRes.builder().review(u).build())
                .collect(Collectors.toList());

        return reviewResList;
    }
}
