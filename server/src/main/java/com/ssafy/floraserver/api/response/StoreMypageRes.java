package com.ssafy.floraserver.api.response;

import com.ssafy.floraserver.db.entity.Store;
import lombok.Builder;
import lombok.Getter;

@Getter
public class StoreMypageRes {

    private Long sId;
    private String name;
    private String sImg;

    @Builder
    public StoreMypageRes(Store store) {
        this.sId = store.getSId();
        this.name = store.getName();
        this.sImg = store.getImgPath();
    }
}
