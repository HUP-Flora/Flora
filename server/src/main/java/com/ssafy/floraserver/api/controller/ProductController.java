package com.ssafy.floraserver.api.controller;

import com.ssafy.floraserver.api.request.ProductReq;
import com.ssafy.floraserver.api.request.StoreExtraInfoReq;
import com.ssafy.floraserver.api.response.ProductRes;
import com.ssafy.floraserver.api.service.ProductService;
import com.ssafy.floraserver.common.util.SecurityUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.Map;

@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/api/products")
public class ProductController {

    private final ProductService productService;

    @GetMapping("/{pId}")
    public ProductRes findProduct(@PathVariable("pId") Long pId){
        ProductRes productRes = productService.findProduct(pId);

        return productRes;
    }

    @PostMapping
    public ResponseEntity<?> createProduct(@Value("${file.upload.location}") String filePath,
                                           @RequestPart("file") MultipartFile file,
                                           @RequestPart("productReq") ProductReq productReq
                                           ){
        Map<String, String> authInfo = SecurityUtil.getCurrentUser();
        productService.createProduct(productReq, filePath, file, authInfo);

        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @PutMapping("/{pId}")
    public ResponseEntity<?> updateProduct(@RequestPart("productReq") ProductReq productReq,
                                           @PathVariable("pId") Long pId,
                                           @Value("${file.upload.location}") String filePath,
                                           @RequestPart("file") MultipartFile file){
        Map<String, String> authInfo = SecurityUtil.getCurrentUser();
        productService.updateProduct(productReq, pId, filePath, file, authInfo);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }
}
