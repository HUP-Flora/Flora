package com.ssafy.floraserver.api.response;

import com.ssafy.floraserver.db.entity.Review;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDate;

@Getter
public class UserReviewRes {

    private Long revId;
    private String sName;
    private String content;
    private LocalDate createDate;

    @Builder
    public UserReviewRes(Review review) {
        this.revId = review.getRevId();
        this.sName = review.getSId().getName();
        this.content = review.getContent();
        this.createDate = review.getCreateDate();
    }
}
