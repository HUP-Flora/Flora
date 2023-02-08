package com.ssafy.floraserver.api.response;

import com.ssafy.floraserver.db.entity.Review;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDate;

@Getter
public class StoreReviewRes {

    private Long revId;
    private String nickname;
    private String content;
    private LocalDate createDate;
    private String rImg;

    @Builder
    public StoreReviewRes(Review review) {
        this.revId = review.getRevId();
        this.nickname = review.getUId().getNickname();
        this.content = review.getContent();
        this.createDate = review.getCreateDate();
        this.rImg = review.getImgPath();
    }
}
