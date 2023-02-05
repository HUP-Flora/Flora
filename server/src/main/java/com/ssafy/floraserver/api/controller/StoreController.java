package com.ssafy.floraserver.api.controller;

import com.ssafy.floraserver.api.response.ProductRes;
import com.ssafy.floraserver.api.response.StoreRes;
import com.ssafy.floraserver.api.service.StoreService;
import com.ssafy.floraserver.api.response.StoreListRes;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/api/stores")
public class StoreController {

    private final StoreService storeService;

    @GetMapping
    public List<StoreListRes> findStoreList(@RequestParam String address, Pageable pageable){

        List<StoreListRes> storeListResList = storeService.findStoreList(address, pageable);

        return storeListResList;
    }

    @GetMapping("{sId}")
    public StoreRes findStore(@PathVariable Long sId){

        StoreRes storeRes = storeService.findStore(sId);

        return storeRes;
    }

    @GetMapping("{sId}/products")
    public List<ProductRes> findProductList(@PathVariable("sId") Long sId, Pageable pageable){

        List<ProductRes> productList = storeService.findProductList(sId, pageable);

        return productList;
    }

    @GetMapping("products/{pId}")
    public ProductRes findProduct(@PathVariable("pId") Long pId){
        ProductRes productRes = storeService.findProduct(pId);
        return productRes;
    }
}
