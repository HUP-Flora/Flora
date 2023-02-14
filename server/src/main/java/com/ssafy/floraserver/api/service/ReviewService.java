package com.ssafy.floraserver.api.service;

import com.ssafy.floraserver.api.request.ReviewReq;
import com.ssafy.floraserver.api.response.StoreReviewRes;
import com.ssafy.floraserver.api.response.UserReviewRes;
import com.ssafy.floraserver.api.vo.FileVO;
import com.ssafy.floraserver.common.exception.CustomException;
import com.ssafy.floraserver.common.exception.ErrorCode;
import com.ssafy.floraserver.db.entity.*;
import com.ssafy.floraserver.db.repository.OrderRepository;
import com.ssafy.floraserver.db.repository.ReviewRepository;
import com.ssafy.floraserver.db.repository.StoreRepository;
import com.ssafy.floraserver.db.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.util.Map;
import java.util.Optional;

@Service
@Slf4j
@RequiredArgsConstructor
@Transactional
public class ReviewService {

    private final ReviewRepository reviewRepository;
    private final UserRepository userRepository;
    private final StoreRepository storeRepository;
    private final OrderRepository orderRepository;
    private final FileService fileService;


    public Page<StoreReviewRes> findReviewListByStore(Long sId, Pageable pageable) {
        Page<Review> reviewList = reviewRepository.findAllBySId(sId, pageable);

        Page<StoreReviewRes> storeReviewResList = reviewList
                .map(s -> StoreReviewRes.builder().review(s).build());

        return storeReviewResList;
    }

    public Page<UserReviewRes> findReviewListByUser(Pageable pageable, Map<String, String> authInfo) {
        Long uId = Long.parseLong(authInfo.get("uId"));

        Page<Review> reviewList = reviewRepository.findAllByUId(uId, pageable);

        Page<UserReviewRes> reviewResList = reviewList
                .map(u -> UserReviewRes.builder().review(u).build());

        return reviewResList;
    }

    public void createReview(ReviewReq reviewReq,
                             MultipartFile file,
                             Map<String, String> authInfo) {

        Long uId = Long.parseLong(authInfo.get("uId"));

        User user = userRepository.findById(uId)
                .orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND));

        Store store = storeRepository.findById((long) reviewReq.getStore())
                        .orElseThrow(() -> new CustomException(ErrorCode.STORE_NOT_FOUND));

        Order order = orderRepository.findById(reviewReq.getOrder())
                .orElseThrow(() -> new CustomException(ErrorCode.ORDER_NOT_FOUND));

        FileVO fileVO = null;
        // 이미지 저장
        if(!file.isEmpty()){
            fileVO = fileService.uploadFile(file);
        }

        reviewRepository.save(Review.builder()
                .uId(user)
                .oId(order)
                .sId(store)
                .content(reviewReq.getContent())
                .imgOriginalName(fileVO != null ? fileVO.getImgOriginalName() : null)
                .imgNewName(fileVO != null ? fileVO.getImgNewName() : null)
                .imgPath(fileVO != null ? fileVO.getImgPath() : null)
                .imgUploadTime(fileVO != null ? fileVO.getImgUploadTime() : null)
                .build());

        order.setReviewflag(true);
    }

    public void deleteReview(Long revId, Map<String, String> authInfo) {
        Long uId = Long.parseLong(authInfo.get("uId"));

        // 삭제할 리뷰
        Review review = reviewRepository.findById(revId)
                .orElseThrow(() -> new CustomException(ErrorCode.REVIEW_NOT_FOUND));

        review.deleteReview();
    }
}
