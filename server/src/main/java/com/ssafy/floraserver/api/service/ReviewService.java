package com.ssafy.floraserver.api.service;

import com.ssafy.floraserver.api.request.ReviewReq;
import com.ssafy.floraserver.api.response.StoreReviewRes;
import com.ssafy.floraserver.api.response.UserReviewRes;
import com.ssafy.floraserver.db.entity.Review;
import com.ssafy.floraserver.db.entity.Store;
import com.ssafy.floraserver.db.entity.User;
import com.ssafy.floraserver.db.repository.ReviewRepository;
import com.ssafy.floraserver.db.repository.StoreRepository;
import com.ssafy.floraserver.db.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@Slf4j
@RequiredArgsConstructor
@Transactional
public class ReviewService {

    private final ReviewRepository reviewRepository;
    private final UserRepository userRepository;
    private final StoreRepository storeRepository;


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

    public void createReview(ReviewReq reviewReq, Map<String, String> authInfo) {

        Long uId = Long.parseLong(authInfo.get("uId"));

        User user = userRepository.findById(uId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));

        Store store = storeRepository.findById((long) reviewReq.getStore())
                        .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));

        reviewRepository.save(Review.builder()
                .uId(user)
                .sId(store)
                .content(reviewReq.getContent())
                .build());
    }
}