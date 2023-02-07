package com.ssafy.floraserver.api.service;

import com.ssafy.floraserver.api.response.ProductRes;
import com.ssafy.floraserver.api.response.RegionRes;
import com.ssafy.floraserver.api.response.StoreListRes;
import com.ssafy.floraserver.api.response.StoreRes;
import com.ssafy.floraserver.db.entity.Product;
import com.ssafy.floraserver.db.entity.Store;
import com.ssafy.floraserver.db.repository.ProductRepository;
import com.ssafy.floraserver.db.repository.StoreRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.*;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.util.Arrays;

@Service
@Slf4j
@RequiredArgsConstructor
@Transactional
public class StoreService {

    private final StoreRepository storeRepository;
    private final ProductRepository productRepository;

    public Page<RegionRes> findRegionList(String word, Pageable pageable) {
        // 1. [봉명]으로 address_name에서 %봉명%으로 찾아서 region_1depth_name, region_2depth_name, region_3depth_name 가져오기

        Page<RegionRes> regionList = storeRepository.findAllDtoByWord(word, pageable);

        return regionList;
    }

    public Page<StoreListRes> findStoreList(String address, Pageable pageable) {
        String[] splitAddress = address.split(" ");
        log.info(Arrays.toString(splitAddress));

        pageable = PageRequest.of(pageable.getPageNumber(), pageable.getPageSize(),  Sort.by("bookmarkCnt").descending());

        Page<Store> storeList = storeRepository.findAllByRegionDepthName(splitAddress[0], splitAddress[1], splitAddress[2], pageable);

        Page<StoreListRes> storeResList = storeList
                .map(s -> StoreListRes.builder().store(s).build());
        return storeResList;
    }

    public StoreRes findStore(Long sId) {

        Store store = storeRepository.findById(sId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));

        return StoreRes.builder().store(store).build();
    }

    public Page<ProductRes> findProductList(Long sId, Pageable pageable) {

        Page<Product> productList = productRepository.findAllBySId(sId, pageable);

        Page<ProductRes> productResList = productList
                .map(p -> ProductRes.builder().product(p).build());

        return productResList;
    }

    public ProductRes findProduct(Long pId) {
        Product product = productRepository.findById(pId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));

        return ProductRes.builder().product(product).build();
    }

}
