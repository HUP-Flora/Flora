package com.ssafy.floraserver.api.service;

import com.ssafy.floraserver.common.auth.CustomOAuth2User;
import com.ssafy.floraserver.common.jwt.JwtProvider;
import com.ssafy.floraserver.db.entity.User;
import com.ssafy.floraserver.db.entity.enums.Role;
import com.ssafy.floraserver.db.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

@Service
@Slf4j
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final JwtProvider jwtProvider;

    public String reissueAccessToken(String oldAccessToken, String refreshToken){
        if(!jwtProvider.validateToken(refreshToken)){
            throw new RuntimeException("invalid refresh token");
        }
        log.info("============");
        Authentication authentication = jwtProvider.getAuthentication(oldAccessToken);

//        log.info(((CustomOAuth2User) authentication.getPrincipal()).getEmail());
//        String email = ((CustomOAuth2User) authentication.getPrincipal()).getEmail();

        String email = authentication.getName();
        log.info(email);

//        log.info("AuthService {}", email);
//        log.info("AuthService {}", role);

        User findUser = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Not found user"));
        log.info(refreshToken);
        log.info(findUser.getRefreshToken());
        if(!refreshToken.equals(findUser.getRefreshToken())){
            throw new RuntimeException("invalid refresh token");
        }

        return jwtProvider.createAccessToken(authentication);
    }
}
