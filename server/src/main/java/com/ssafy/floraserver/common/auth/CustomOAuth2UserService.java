package com.ssafy.floraserver.common.auth;

import com.ssafy.floraserver.db.repository.UserRepository;
import com.ssafy.floraserver.db.entity.User;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.Optional;

@Slf4j
@Service
@RequiredArgsConstructor
public class CustomOAuth2UserService extends DefaultOAuth2UserService {

    private final UserRepository userRepository;

    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {

        OAuth2User oAuth2User = super.loadUser(userRequest);

        String registrationId = userRequest.getClientRegistration().getRegistrationId(); // 소셜 정보 가져옴
        String userNameAttributeName = userRequest.getClientRegistration().getProviderDetails().getUserInfoEndpoint().getUserNameAttributeName();
//        log.info("========" + registrationId + " " + userNameAttributeName + "========");

        OAuthAttributes attributes = OAuthAttributes.of(registrationId, userNameAttributeName, oAuth2User.getAttributes());
        log.info("CustomOAuth2UserService");
        User user = saveOrUpdate(attributes);
        log.info("========" + user.getEmail() + " " + user.getRole() + " " + user.getUId() + "========");
        return new CustomOAuth2User(
                Collections.singleton(new SimpleGrantedAuthority(user.getRole().getKey())),
                attributes.getAttributes(),
                attributes.getNameAttributeKey(),
                user.getUId(),
                user.getEmail(),
                user.getRole()
        );
    }

    private User saveOrUpdate(OAuthAttributes oAuthAttributes){
        User user = oAuthAttributes.toEntity();
        Optional<User> loadUser = userRepository.findByEmail(user.getEmail());

        if (loadUser.isEmpty()){ // 가입된 이메일이 없다면 저장하고
            return userRepository.save(user);
        } else { // 있으면 가져온다.
            return loadUser.get();
        }
    }

}
