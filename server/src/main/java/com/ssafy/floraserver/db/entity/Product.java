package com.ssafy.floraserver.db.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "products")
@NoArgsConstructor
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

    // 연관관계 필요
    @Column(nullable = false)
    private int sId;

    private String pImgOriginalName;

    private String pImgNewName;

    private int pImgSize;

    private String pImgPath;

    private String pImgField;

    private LocalDateTime pImgUploadTime;
}
