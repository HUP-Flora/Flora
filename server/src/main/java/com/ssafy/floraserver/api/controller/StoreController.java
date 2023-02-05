package com.ssafy.floraserver.api.controller;

import com.ssafy.floraserver.api.service.StoreService;
import com.ssafy.floraserver.api.response.StoreRes;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;

@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/api/stores")
public class StoreController {

    private final StoreService storeService;

    @GetMapping
    public List<StoreRes> findStoreList(@RequestParam String address, Pageable pageable){

        List<StoreRes> storeResList = storeService.findStoreList(address, pageable);

        return storeResList;
    }
}
