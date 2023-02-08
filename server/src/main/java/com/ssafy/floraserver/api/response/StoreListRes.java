package com.ssafy.floraserver.api.response;

import com.ssafy.floraserver.db.entity.Store;
import com.ssafy.floraserver.db.entity.enums.OnAirType;
import lombok.Builder;
import lombok.Getter;

@Getter
public class StoreListRes {

    private Long sId;
    private String name;
    private String phoneNumber;
    private String address_name;
    private OnAirType isOnair;
    private String start;
    private String end;
    private float lat;
    private float lng;
    private int bookmarkCnt;
    private String sImg;

    @Builder
    public StoreListRes(Store store) {
        this.sId = store.getSId();
        this.name = store.getName();
        this.phoneNumber = store.getPhoneNumber();
        this.address_name = store.getAddress_name();
        this.isOnair = store.getIsOnair();
        this.start = store.getStart().getTime();
        this.end = store.getEnd().getTime();
        this.lat = store.getLat();
        this.lng = store.getLng();
        this.bookmarkCnt = store.getBookmarkCnt();
        this.sImg = store.getImgPath();
    }
}
