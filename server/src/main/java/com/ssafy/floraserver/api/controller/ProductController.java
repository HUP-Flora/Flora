package com.ssafy.floraserver.api.controller;

import com.ssafy.floraserver.api.request.ProductReq;
import com.ssafy.floraserver.api.response.ProductRes;
import com.ssafy.floraserver.api.service.ProductService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
    public ResponseEntity<?> createProduct(@RequestBody ProductReq productReq){
        productService.createProduct(productReq);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @PutMapping("/{pId}")
    public ResponseEntity<?> updateProduct(@RequestBody ProductReq productReq,
                                           @PathVariable("pId") Long pId){
        productService.updateProduct(productReq, pId);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }
}
