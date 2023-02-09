package com.ssafy.floraserver.api.response;

import com.ssafy.floraserver.db.entity.Review;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDate;

@Getter
public class UserReviewRes {

    private Long revId;
    private String name;
    private String content;
    private LocalDate createDate;
    private String rImg;

    @Builder
    public UserReviewRes(Review review) {
        this.revId = review.getRevId();
        this.name = review.getSId().getName();
        this.content = review.getContent();
        this.createDate = review.getCreateDate();
        this.rImg = review.getImgPath();
    }
}
