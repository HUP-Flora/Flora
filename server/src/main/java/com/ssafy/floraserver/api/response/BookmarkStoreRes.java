package com.ssafy.floraserver.api.response;

import com.ssafy.floraserver.db.entity.Bookmark;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class BookmarkStoreRes {

    private Long sId;
    private String sName;
    private String phoneNumber;
    private String address_name;
    private String start;
    private String end;
    private String img;

    @Builder
    public BookmarkStoreRes(Bookmark bookmark) {
        this.sId = bookmark.getSId().getSId();
        this.sName = bookmark.getSId().getName();
        this.phoneNumber = bookmark.getSId().getPhoneNumber();
        this.address_name = bookmark.getSId().getAddress_name();
        this.start = bookmark.getSId().getStart().getTime();
        this.end = bookmark.getSId().getEnd().getTime();
        this.img = bookmark.getSId().getImgPath();
    }
}
