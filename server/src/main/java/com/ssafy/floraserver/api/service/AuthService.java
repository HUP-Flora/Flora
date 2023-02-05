package com.ssafy.floraserver.api.service;

import com.ssafy.floraserver.api.request.StoreExtraInfoReq;
import com.ssafy.floraserver.api.request.UserExtraInfoReq;
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
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.util.Map;

@Service
@Slf4j
@RequiredArgsConstructor
@Transactional
public class AuthService {

    private final UserRepository userRepository;
    private final StoreRepository storeRepository;
    private final TimeUnitRepository timeUnitRepository;
    private final JwtProvider jwtProvider;

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

        return jwtProvider.createAccessToken(authentication, findUser.getUId().toString());
    }

    public void createUserExtraInfo(UserExtraInfoReq userExtraInfoReq, Map<String, String> authInfo){
        String email = authInfo.get("email");
        Long uId = Long.parseLong(authInfo.get("uId"));
        // 닉네임, 전화번호 저장 및 Role CUSTOMER로 바꾸기
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));

        user = user.builder()
                .uId(uId)
                .role(Role.CUSTOMER)
                .nickname(userExtraInfoReq.getNickName())
                .phoneNumber(userExtraInfoReq.getPhoneNumber())
                .refreshToken(user.getRefreshToken())
                .build();

        userRepository.save(user);
    }

    public Store createStoreExtraInfo(StoreExtraInfoReq storeExtraInfoReq, Map<String, String> authInfo) {

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

        // TimeUnitDto StoreDto

        Store store = Store.builder()
                .uId(user)
                .businessLicense(storeExtraInfoReq.getBusinessLicense())
                .name(storeExtraInfoReq.getName())
                .phoneNumber(storeExtraInfoReq.getPhoneNumber())
                .sido(storeExtraInfoReq.getSido())
                .gugun(storeExtraInfoReq.getGugun())
                .dong(storeExtraInfoReq.getDong())
                .detailedAddress(storeExtraInfoReq.getDetailedAddress())
                .lat(storeExtraInfoReq.getLat())
                .lng(storeExtraInfoReq.getLng())
                .desc(storeExtraInfoReq.getDesc())
                .holiday(storeExtraInfoReq.getHoliday())
                .start(start)
                .end(end)
                .build();

        Store save = storeRepository.save(store);

        return save;
    }
}
