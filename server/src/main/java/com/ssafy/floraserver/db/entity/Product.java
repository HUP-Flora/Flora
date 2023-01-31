package com.ssafy.floraserver.db.entity;

import lombok.AccessLevel;
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

    @Column(nullable = false)
    private String pName;

    @Column(nullable = false)
    private String pDesc;

    @Column(nullable = false)
    private int pPrice;

    // 상품 - 가게
    // 다대일 단방향
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "s_id", nullable = false)
    private Store sId;

    private String pImgOriginalName;

    private String pImgNewName;

    private int pImgSize;

    private String pImgPath;

    private String pImgField;

    private LocalDateTime pImgUploadTime;
}
