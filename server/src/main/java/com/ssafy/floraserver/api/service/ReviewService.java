package com.ssafy.floraserver.api.service;

import com.ssafy.floraserver.api.request.ReviewReq;
import com.ssafy.floraserver.api.response.StoreReviewRes;
import com.ssafy.floraserver.api.response.UserReviewRes;
import com.ssafy.floraserver.api.vo.FileVO;
import com.ssafy.floraserver.db.entity.Order;
import com.ssafy.floraserver.db.entity.Review;
import com.ssafy.floraserver.db.entity.Store;
import com.ssafy.floraserver.db.entity.User;
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
    private final OrderRepository orderRepository;
    private final FileService fileService;


    public Page<StoreReviewRes> findReviewListByStore(Long sId, Pageable pageable) {
        Page<Review> reviewList = reviewRepository.findAllBySId(sId, pageable);

        Page<StoreReviewRes> storeReviewResList = reviewList
                .map(s -> StoreReviewRes.builder().review(s).build());

        return storeReviewResList;
    }

    public Page<UserReviewRes> findReviewListByUser(Long uId, Pageable pageable) {
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
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));

        Store store = storeRepository.findById((long) reviewReq.getStore())
                        .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));

        Order order = orderRepository.findById(reviewReq.getOrder())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));

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
                .imgOriginalName(file.isEmpty() ? null : fileVO.getImgOriginalName())
                .imgNewName(file.isEmpty() ? null : fileVO.getImgNewName())
                .imgPath(file.isEmpty() ? null : fileVO.getImgPath())
                .imgUploadTime(file.isEmpty() ? null : fileVO.getImgUploadTime())
                .build());

        order.setReviewflag(true);
    }
}
