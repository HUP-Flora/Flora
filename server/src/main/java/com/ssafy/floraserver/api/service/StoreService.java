package com.ssafy.floraserver.api.service;

import com.ssafy.floraserver.api.request.StoreInfoReq;
import com.ssafy.floraserver.api.response.*;
import com.ssafy.floraserver.api.vo.FileVO;
import com.ssafy.floraserver.common.exception.CustomException;
import com.ssafy.floraserver.common.exception.ErrorCode;
import com.ssafy.floraserver.db.entity.Product;
import com.ssafy.floraserver.db.entity.Store;
import com.ssafy.floraserver.db.entity.TimeUnit;
import com.ssafy.floraserver.db.entity.User;
import com.ssafy.floraserver.db.entity.enums.OnAirType;
import com.ssafy.floraserver.db.repository.ProductRepository;
import com.ssafy.floraserver.db.repository.StoreRepository;
import com.ssafy.floraserver.db.repository.TimeUnitRepository;
import com.ssafy.floraserver.db.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.*;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.util.Arrays;
import java.util.Map;
import java.util.Objects;

@Service
@Slf4j
@RequiredArgsConstructor
@Transactional
public class StoreService {

    private final StoreRepository storeRepository;
    private final ProductRepository productRepository;
    private final UserRepository userRepository;
    private final FileService fileService;
    private final TimeUnitRepository timeUnitRepository;

    public Page<RegionRes> findRegionList(String word, Pageable pageable) {
        // 1. [봉명]으로 address_name에서 %봉명%으로 찾아서 region_1depth_name, region_2depth_name, region_3depth_name 가져오기

        Page<RegionRes> regionList = storeRepository.findAllDtoByWord(word, pageable);

        return regionList;
    }

    public Page<StoreListRes> findStoreList(String address, String day, Pageable pageable) {
        String[] splitAddress = address.split(" ");
        log.info(Arrays.toString(splitAddress));

        pageable = PageRequest.of(pageable.getPageNumber(), pageable.getPageSize(),  Sort.by("bookmarkCnt").descending());

        Page<Store> storeList = storeRepository.findAllByRegionDepthName(day, splitAddress[0], splitAddress[1], splitAddress[2], pageable);

        Page<StoreListRes> storeResList = storeList
                .map(s -> StoreListRes.builder().store(s).build());
        return storeResList;
    }

    public StoreRes findStore(Long sId) {

        Store store = storeRepository.findById(sId)
                .orElseThrow(() -> new CustomException(ErrorCode.STORE_NOT_FOUND));

        return StoreRes.builder().store(store).build();
    }

    public Page<ProductRes> findProductList(Long sId, Pageable pageable) {

        Page<Product> productList = productRepository.findAllBySId(sId, pageable);

        Page<ProductRes> productResList = productList
                .map(p -> ProductRes.builder().product(p).build());

        return productResList;
    }

    public StoreMypageRes findStoreMypageInfo(Map<String, String> authInfo) {

        Long uId = Long.parseLong(authInfo.get("uId"));

        // 가게 확인
        Store store = storeRepository.findByUId(uId)
                .orElseThrow(() -> new CustomException(ErrorCode.STORE_NOT_FOUND));

        return StoreMypageRes.builder()
                .store(store)
                .build();
    }

    public void updateStoreInfo(StoreInfoReq storeInfoReq,
                                MultipartFile file,
                                Map<String, String> authInfo) {

        Long uId = Long.parseLong(authInfo.get("uId"));

        // 로그인한 유저
        User user = userRepository.findById(uId)
                .orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND));

        // 가게 확인
        Store store = storeRepository.findByUId(uId)
                .orElseThrow(() -> new CustomException(ErrorCode.STORE_NOT_FOUND));

        TimeUnit start = timeUnitRepository.findById(storeInfoReq.getStart())
                .orElseThrow(() -> new CustomException(ErrorCode.TIMEUNIT_NOT_FOUND));
        TimeUnit end = timeUnitRepository.findById(storeInfoReq.getEnd())
                .orElseThrow(() -> new CustomException(ErrorCode.TIMEUNIT_NOT_FOUND));

        FileVO fileVO = null;
        // 이미지 저장
        if(!file.isEmpty()){
            fileVO = fileService.uploadFile(file);
        }

        store.updateStoreInfo(store, storeInfoReq, start, end, fileVO);
    }

    public void toggleOnair( Map<String, String> authInfo) {
        Long uId = Long.parseLong(authInfo.get("uId"));

        // 가게 확인
        Store store = storeRepository.findByUId(uId)
                .orElseThrow(() -> new CustomException(ErrorCode.STORE_NOT_FOUND));

        // IsOnairType ON, OFF
        store.updateIsOnair(store.getIsOnair() == OnAirType.ON ? OnAirType.OFF : OnAirType.ON);
    }
}
