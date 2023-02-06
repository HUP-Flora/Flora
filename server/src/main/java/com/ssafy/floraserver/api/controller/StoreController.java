package com.ssafy.floraserver.api.controller;

import com.ssafy.floraserver.api.response.ProductRes;
import com.ssafy.floraserver.api.response.RegionRes;
import com.ssafy.floraserver.api.response.StoreRes;
import com.ssafy.floraserver.api.service.StoreService;
import com.ssafy.floraserver.api.response.StoreListRes;
import com.ssafy.floraserver.db.entity.Store;
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

    @GetMapping("/regions")
    public List<RegionRes> findRegionList(@RequestParam String word, Pageable pageable){
        List<RegionRes> regionList = storeService.findRegionList(word, pageable);

        return regionList;
    }

    @GetMapping
    public List<StoreListRes> findStoreList(@RequestParam String address, Pageable pageable){

        List<StoreListRes> storeResList = storeService.findStoreList(address, pageable);

        return storeResList;
    }

    @GetMapping("{sId}")
    public StoreRes findStore(@PathVariable Long sId){

        StoreRes storeRes = storeService.findStore(sId);

        return storeRes;
    }

    @GetMapping("{sId}/products")
    public List<ProductRes> findProductList(@PathVariable("sId") Long sId, Pageable pageable){
        // TODO 페이징 hasNext
        List<ProductRes> productResList = storeService.findProductList(sId, pageable);

        return productResList;
    }

    @GetMapping("products/{pId}")
    public ProductRes findProduct(@PathVariable("pId") Long pId){
        ProductRes productRes = storeService.findProduct(pId);
        return productRes;
    }
}
