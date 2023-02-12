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
    private String region_1depth_name;
    private String region_2depth_name;
    private String region_3depth_name;
    private String address_name;
    private String desc;
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
        this.region_1depth_name = store.getRegion_1depth_name();
        this.region_2depth_name = store.getRegion_2depth_name();
        this.region_3depth_name = store.getRegion_3depth_name();
        this.address_name = store.getAddress_name();
        this.desc = store.getDesc();
        this.holiday = store.getHoliday();
        this.isOnair = store.getIsOnair();
        this.start = store.getStart().getTime();
        this.end = store.getEnd().getTime();
        this.bookmarkCnt = store.getBookmarkCnt();
        this.reviewCnt = store.getReviewCnt();
        this.sImg = store.getImgPath();
    }
}
