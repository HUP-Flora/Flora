package com.ssafy.floraserver.db.entity;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "products")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long pId;

    @Column(name = "p_name", nullable = false)
    private String name;

    @Column(name = "p_desc", nullable = false)
    private String desc;

    @Column(name = "p_price", nullable = false)
    private int price;

    // 상품 - 가게
    // 다대일 단방향
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "s_id", nullable = false)
    private Store sId;

    @Column(name = "p_img_original_name")
    private String imgOriginalName;

    @Column(name = "p_img_new_name")
    private String imgNewName;

    @Column(name = "p_img_path")
    private String imgPath;

    @Column(name = "p_img_upload_time")
    private LocalDateTime imgUploadTime;

    @Builder
    public Product(Long pId, String name, String desc, int price, Store sId, String imgOriginalName, String imgNewName, String imgPath, LocalDateTime imgUploadTime) {
        this.pId = pId;
        this.name = name;
        this.desc = desc;
        this.price = price;
        this.sId = sId;
        this.imgOriginalName = imgOriginalName;
        this.imgNewName = imgNewName;
        this.imgPath = imgPath;
        this.imgUploadTime = imgUploadTime;
    }
}
