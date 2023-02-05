package com.ssafy.floraserver.api.response;

import com.ssafy.floraserver.db.entity.Store;
import com.ssafy.floraserver.db.entity.TimeUnit;
import com.ssafy.floraserver.db.entity.enums.OnAirType;
import lombok.Builder;
import lombok.Getter;

@Getter
public class StoreRes {

    private Long sId;
    private String sName;
    private String phoneNumber;
    private String sido;
    private String gugun;
    private String dong;
    private String detailedAddress;
    private String holiday;
    private OnAirType isOnair;
    private String start;
    private String end;
    private int bookmarkCnt;
    private int reviewCnt;

    @Builder
    public StoreRes(Store store) {
        this.sId = store.getSId();
        this.sName = store.getName();
        this.phoneNumber = store.getPhoneNumber();
        this.sido = store.getSido();
        this.gugun = store.getGugun();
        this.dong = store.getDong();
        this.detailedAddress = store.getDetailedAddress();
        this.holiday = store.getHoliday();
        this.isOnair = store.getIsOnair();
        this.start = store.getStart().getTime();
        this.end = store.getEnd().getTime();
        this.bookmarkCnt = store.getBookmarkCnt();
        this.reviewCnt = store.getReviewCnt();
    }
}
