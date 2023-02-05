package com.ssafy.floraserver.api.service;

import com.ssafy.floraserver.api.response.ProductRes;
import com.ssafy.floraserver.api.response.StoreListRes;
import com.ssafy.floraserver.api.response.StoreRes;
import com.ssafy.floraserver.db.entity.Product;
import com.ssafy.floraserver.db.entity.Store;
import com.ssafy.floraserver.db.repository.ProductRepository;
import com.ssafy.floraserver.db.repository.StoreRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.util.Arrays;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Slf4j
@RequiredArgsConstructor
@Transactional
public class StoreService {

    private final StoreRepository storeRepository;
    private final ProductRepository productRepository;

    public List<StoreListRes> findStoreList(String address, Pageable pageable) {
        String[] splitAddress = address.split(" ");
        log.info(Arrays.toString(splitAddress));

        pageable = PageRequest.of(pageable.getPageNumber(), pageable.getPageSize(),  Sort.by("bookmarkCnt").descending());

        List<Store> storeList = storeRepository.findAllBySidoAndGugunAndDong(splitAddress[0], splitAddress[1], splitAddress[2], pageable);

        List<StoreListRes> storeResList = storeList.stream()
//                .sorted(Comparator.comparingInt(a -> a.getIsOnair().ordinal()))
                .sorted(Comparator.comparing(Store::getIsOnair))
                .map(s -> StoreListRes.builder().store(s).build())
                .collect(Collectors.toList());

        return storeResList;
    }


    public StoreRes findStore(Long sId) {

        StoreRes storeRes = storeRepository.findStoreRes(sId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
        return storeRes;
    }

    public List<ProductRes> findProductList(Long sId, Pageable pageable) {

        List<Product> productList = productRepository.findAllBySId(sId, pageable);

        List<ProductRes> productResList = productList.stream()
                .map(p -> ProductRes.builder().product(p).build())
                .collect(Collectors.toList());

        return productResList;
    }

    public ProductRes findProduct(Long pId) {
        Product product = productRepository.findById(pId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));

        return ProductRes.builder().product(product).build();
    }
}
