package com.ssafy.floraserver.api.response;

import com.ssafy.floraserver.db.entity.Store;
import com.ssafy.floraserver.db.entity.TimeUnit;
import com.ssafy.floraserver.db.entity.enums.OnAirType;
import lombok.Builder;
import lombok.Getter;

@Getter
public class StoreRes {

    private Long sId;
    private String name;
    private String phoneNumber;
    private String address_name;
    private String holiday;
    private OnAirType isOnair;
    private String start;
    private String end;
    private int bookmarkCnt;
    private int reviewCnt;
    private String sImg;

    @Builder
    public StoreRes(Store store) {
        this.sId = store.getSId();
        this.name = store.getName();
        this.phoneNumber = store.getPhoneNumber();
        this.address_name = store.getAddress_name();
        this.holiday = store.getHoliday();
        this.isOnair = store.getIsOnair();
        this.start = store.getStart().getTime();
        this.end = store.getEnd().getTime();
        this.bookmarkCnt = store.getBookmarkCnt();
        this.reviewCnt = store.getReviewCnt();
        this.sImg = store.getImgPath();
    }
}