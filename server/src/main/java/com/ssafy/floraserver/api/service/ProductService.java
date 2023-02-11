package com.ssafy.floraserver.api.service;

import com.ssafy.floraserver.api.request.ProductReq;
import com.ssafy.floraserver.api.response.ProductRes;
import com.ssafy.floraserver.api.vo.FileVO;
import com.ssafy.floraserver.common.util.SecurityUtil;
import com.ssafy.floraserver.db.entity.Product;
import com.ssafy.floraserver.db.entity.Store;
import com.ssafy.floraserver.db.repository.ProductRepository;
import com.ssafy.floraserver.db.repository.StoreRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.util.Map;

@Service
@Slf4j
@RequiredArgsConstructor
@Transactional
public class ProductService {

    private final ProductRepository productRepository;
    private final StoreRepository storeRepository;
    private final FileService fileService;

    public ProductRes findProduct(Long pId) {

        Product product = productRepository.findById(pId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));

        return ProductRes.builder()
                .product(product)
                .build();
    }

    public void createProduct(ProductReq productReq,
                              MultipartFile file,
                              Map<String, String> authInfo) {

        Long uId = Long.valueOf(authInfo.get("uId"));

        // 접속한 사람이 주인인 가게를 찾는다.
        Store store = storeRepository.findByUId(uId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));

        FileVO fileVO = null;
        // 이미지 저장
        if(!file.isEmpty()){
            fileVO = fileService.uploadFile(file);
        }

        productRepository.save(Product.builder()
                        .name(productReq.getName())
                        .desc(productReq.getDesc())
                        .price(productReq.getPrice())
                        .sId(store)
                        .imgOriginalName(file.isEmpty() ? null : fileVO.getImgOriginalName())
                        .imgNewName(file.isEmpty() ? null : fileVO.getImgNewName())
                        .imgPath(file.isEmpty() ? null : fileVO.getImgPath())
                        .imgUploadTime(file.isEmpty() ? null : fileVO.getImgUploadTime())
                        .build()
        );
    }

    public void updateProduct(ProductReq productReq, Long pId,
                              MultipartFile file,
                              Map<String, String> authInfo) {

        Long uId = Long.valueOf(authInfo.get("uId"));

        // 내 가게
        Store store = storeRepository.findByUId(uId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));

        // 수정할 상품
        Product product = productRepository.findById(pId)
                        .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));

        // 이 상품이 내 가게꺼인가
        if(product.getSId() != store){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }

        FileVO fileVO = FileVO.builder()
                .imgOriginalName(product.getImgOriginalName())
                .imgNewName(product.getImgNewName())
                .imgPath(product.getImgPath())
                .imgUploadTime(product.getImgUploadTime())
                .build();

        // 이미지 저장
        if(!file.isEmpty()){
            fileVO = fileService.uploadFile(file);
        }

        productRepository.save(Product.builder()
                .pId(pId)
                .name(productReq.getName())
                .desc(productReq.getDesc())
                .price(productReq.getPrice())
                .sId(store)
                .imgOriginalName(file.isEmpty() ? null : fileVO.getImgOriginalName())
                .imgNewName(file.isEmpty() ? null : fileVO.getImgNewName())
                .imgPath(file.isEmpty() ? null : fileVO.getImgPath())
                .imgUploadTime(file.isEmpty() ? null : fileVO.getImgUploadTime())
                .build()
        );
    }

    public void deleteProduct(Long pId, Map<String, String> authInfo) {
        
        Long uId = Long.parseLong(authInfo.get("uId"));

        // 내 가게
        Store store = storeRepository.findByUId(uId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));

        // 삭제할 상품
        Product product = productRepository.findById(pId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));

        product.deleteProduct();
    }

}