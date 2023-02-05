package com.ssafy.floraserver.api.response;

import com.ssafy.floraserver.db.entity.Review;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDate;

@Getter
public class StoreReviewRes {

    private Long revId;
    private String nickName;
    private String content;
    private LocalDate createDate;

    @Builder
    public StoreReviewRes(Review review) {
        this.revId = review.getRevId();
        this.nickName = review.getUId().getNickname();
        this.content = review.getContent();
        this.createDate = review.getCreateDate();
    }
}
