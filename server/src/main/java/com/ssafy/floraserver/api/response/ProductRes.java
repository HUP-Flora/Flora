package com.ssafy.floraserver.api.response;

import com.ssafy.floraserver.db.entity.Product;
import lombok.Builder;
import lombok.Getter;

@Getter
public class ProductRes {

    private Long pId;
    private String name;
    private String desc;
    private int price;
    private String img;

    @Builder
    public ProductRes(Product product) {
        this.pId = product.getPId();
        this.name = product.getName();
        this.desc = product.getDesc();
        this.price = product.getPrice();
        this.img = product.getImgPath();
    }
}