package com.ssafy.floraserver.api.service;

import com.ssafy.floraserver.api.request.StoreExtraInfoReq;
import com.ssafy.floraserver.api.request.UserExtraInfoReq;
import com.ssafy.floraserver.api.response.RoleRes;
import com.ssafy.floraserver.api.vo.FileVO;
import com.ssafy.floraserver.common.jwt.JwtProvider;
import com.ssafy.floraserver.db.entity.Store;
import com.ssafy.floraserver.db.entity.User;
import com.ssafy.floraserver.db.entity.TimeUnit;
import com.ssafy.floraserver.db.entity.enums.Role;
import com.ssafy.floraserver.db.repository.StoreRepository;
import com.ssafy.floraserver.db.repository.TimeUnitRepository;
import com.ssafy.floraserver.db.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.util.HashMap;
import java.util.Map;
import java.util.Objects;
import java.util.Optional;

@Service
@Slf4j
@RequiredArgsConstructor
@Transactional
public class AuthService {

    private final UserRepository userRepository;
    private final StoreRepository storeRepository;
    private final TimeUnitRepository timeUnitRepository;
    private final JwtProvider jwtProvider;
    private final FileService fileService;

    public String reissueAccessToken(String oldAccessToken, String refreshToken){
        if(!jwtProvider.validateToken(refreshToken)){
            throw new RuntimeException("invalid refresh token");
        }

        Authentication authentication = jwtProvider.getAuthentication(oldAccessToken);

        String email = authentication.getName();
        log.info(email);

        User findUser = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Not found user"));

        if(!refreshToken.equals(findUser.getRefreshToken())){
            throw new RuntimeException("invalid refresh token");
        }

        return jwtProvider.createAccessToken(authentication, findUser.getUId().toString(), findUser.getRole().toString());
    }

    public String createUserExtraInfo(UserExtraInfoReq userExtraInfoReq, Map<String, String> authInfo){
        String email = authInfo.get("email");
        Long uId = Long.parseLong(authInfo.get("uId"));
        // 닉네임, 전화번호 저장 및 Role CUSTOMER로 바꾸기
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));

        user = user.builder()
                .uId(uId)
                .role(Role.CUSTOMER)
                .nickname(userExtraInfoReq.getNickname())
                .phoneNumber(userExtraInfoReq.getPhoneNumber())
                .refreshToken(user.getRefreshToken())
                .build();

        final Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String accessToken = jwtProvider.createAccessToken(authentication, user.getUId().toString(), user.getRole().toString());

        userRepository.save(user);

        return accessToken;
    }

    public String createStoreExtraInfo(StoreExtraInfoReq storeExtraInfoReq,
                                      MultipartFile file,
                                      Map<String, String> authInfo) {

        // log.info("createStoreExtraInfo : ", authentication.getName());
        // {role=[ROLE_CUSTOMER], email=yurinew@naver.com}
        String email = authInfo.get("email");
        Long uId = Long.parseLong(authInfo.get("uId"));

        // 유저 role STORE 변경
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));

        userRepository.save(user.builder()
                        .uId(uId)
                        .email(email)
                        .role(Role.STORE)
                        .refreshToken(user.getRefreshToken())
                        .build());

        // 가게 user, businessLicense, name, phoneNumber, sido, gugun, dong, detailedAddress, isOnair, holiday 사진

        // start, end 인덱스 찾아서 저장
        TimeUnit start = timeUnitRepository.findById(storeExtraInfoReq.getStart())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
        TimeUnit end = timeUnitRepository.findById(storeExtraInfoReq.getEnd())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));

        FileVO fileVO = null;
        // 이미지 저장
        if(!file.isEmpty()){
            fileVO = fileService.uploadFile(file);
        }

        Store store = Store.builder()
                .uId(user)
                .businessLicense(storeExtraInfoReq.getBusinessLicense())
                .name(storeExtraInfoReq.getName())
                .phoneNumber(storeExtraInfoReq.getPhoneNumber())
                .region_1depth_name(storeExtraInfoReq.getRegion_1depth_name())
                .region_2depth_name(storeExtraInfoReq.getRegion_2depth_name())
                .region_3depth_name(storeExtraInfoReq.getRegion_3depth_name())
                .address_name(storeExtraInfoReq.getAddress_name())
                .lat(storeExtraInfoReq.getLat())
                .lng(storeExtraInfoReq.getLng())
                .desc(storeExtraInfoReq.getDesc())
                .holiday(storeExtraInfoReq.getHoliday())
                .start(start)
                .end(end)
                .imgOriginalName(Optional.of(fileVO.getImgOriginalName()).orElse(null))
                .imgNewName(file.isEmpty() ? null : fileVO.getImgNewName())
                .imgPath(file.isEmpty() ? null : Objects.requireNonNull(fileVO).getImgPath())
                .imgUploadTime(file.isEmpty() ? null : fileVO.getImgUploadTime())
                .build();

        Store save = storeRepository.save(store);

        final Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        String accessToken = jwtProvider.createAccessToken(authentication, user.getUId().toString(), user.getRole().toString());

        return accessToken;
    }

    public Map<String, String> getLoginInfo(Map<String, String> authInfo) {
        Map<String, String> map = new HashMap<>();

        log.info(String.valueOf(Long.parseLong(authInfo.get("uId"))));
        User user = userRepository.findById(Long.parseLong(authInfo.get("uId")))
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
        log.info(user.getRole().getKey());
        if(authInfo.get("role").equals("ROLE_CUSTOMER")){
//            map.put("role", user.getRole().getKey());
            map.put("role", authInfo.get("role"));
        }else{
            Long uId = Long.parseLong(authInfo.get("uId"));

            Store store = storeRepository.findByUId(uId)
                            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));

            map.put("role", authInfo.get("role"));
//            map.put("role", user.getRole().getKey());
            map.put("sId", store.getSId().toString());
        }
        return map;
    }
}
