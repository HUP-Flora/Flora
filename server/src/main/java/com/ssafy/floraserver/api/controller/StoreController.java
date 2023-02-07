package com.ssafy.floraserver.api.controller;

import com.ssafy.floraserver.api.response.ProductRes;
import com.ssafy.floraserver.api.response.RegionRes;
import com.ssafy.floraserver.api.response.StoreRes;
import com.ssafy.floraserver.api.service.StoreService;
import com.ssafy.floraserver.api.response.StoreListRes;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;


@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/api/stores")
public class StoreController {

    private final StoreService storeService;

    @GetMapping("/regions")
    public Page<RegionRes> findRegionList(@RequestParam String word, Pageable pageable){
        Page<RegionRes> regionList = storeService.findRegionList(word, pageable);

        return regionList;
    }

    @GetMapping
    public Page<StoreListRes> findStoreList(@RequestParam String address, Pageable pageable){

        Page<StoreListRes> storeResList = storeService.findStoreList(address, pageable);

        return storeResList;
    }

    @GetMapping("{sId}")
    public StoreRes findStore(@PathVariable Long sId){

        StoreRes storeRes = storeService.findStore(sId);

        return storeRes;
    }

    @GetMapping("{sId}/products")
    public Page<ProductRes> findProductList(@PathVariable("sId") Long sId, Pageable pageable){

        Page<ProductRes> productResList = storeService.findProductList(sId, pageable);

        return productResList;
    }

}
