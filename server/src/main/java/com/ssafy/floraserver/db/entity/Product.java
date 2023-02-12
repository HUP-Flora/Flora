package com.ssafy.floraserver.db.entity;

import com.ssafy.floraserver.api.request.ProductReq;
import com.ssafy.floraserver.api.vo.FileVO;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "products")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@DynamicUpdate
public class Product extends BaseEntity{

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

    @Column(name = "p_soft_delete", columnDefinition = "TINYINT(1)")
    private boolean softDelete;

    public void deleteProduct(){ this.softDelete = true; }

    public void updateProduct(Product product, ProductReq productReq, FileVO fileVO){
        this.name = productReq.getName();
        this.desc = productReq.getDesc();
        this.price = productReq.getPrice();
        this.imgOriginalName = fileVO == null ? product.getImgOriginalName() : fileVO.getImgOriginalName();
        this.imgNewName = fileVO == null ? product.getImgNewName() : fileVO.getImgNewName();
        this.imgPath = fileVO == null ? product.getImgPath() : fileVO.getImgPath();
        this.imgUploadTime = fileVO == null ? product.getImgUploadTime() : fileVO.getImgUploadTime();
    }

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
        this.softDelete = false;
    }
}
