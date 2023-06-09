package com.ssafy.floraserver.api.controller;

import com.ssafy.floraserver.api.request.ProductReq;
import com.ssafy.floraserver.api.response.ProductRes;
import com.ssafy.floraserver.api.service.ProductService;
import com.ssafy.floraserver.common.util.SecurityUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.Map;

@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/v1/products")
public class ProductController {

    private final ProductService productService;

    @GetMapping("/{pId}")
    public ProductRes findProduct(@PathVariable("pId") Long pId){
        ProductRes productRes = productService.findProduct(pId);

        return productRes;
    }

    @PostMapping
    public ResponseEntity<?> createProduct(
                                           @RequestPart(value = "file", required = false) MultipartFile file,
                                           @RequestPart("productReq") ProductReq productReq
                                           ){
        Map<String, String> authInfo = SecurityUtil.getCurrentUser();
        Long pId = productService.createProduct(productReq, file, authInfo);

        return new ResponseEntity<>(pId, HttpStatus.CREATED);
    }

    @PutMapping("/{pId}")
    public ResponseEntity<?> updateProduct(@RequestPart("productReq") ProductReq productReq,
                                           @PathVariable("pId") Long pId,
                                           @RequestPart(value = "file", required = false) MultipartFile file
    ){
        Map<String, String> authInfo = SecurityUtil.getCurrentUser();
        productService.updateProduct(productReq, pId, file, authInfo);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @DeleteMapping("/{pId}")
    public ResponseEntity<?> deleteProduct(@PathVariable("pId") Long pId){
        Map<String, String> authInfo = SecurityUtil.getCurrentUser();
        productService.deleteProduct(pId, authInfo);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }
}
