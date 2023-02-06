package com.ssafy.floraserver.common.auth;

import com.ssafy.floraserver.common.jwt.JwtProvider;
import com.ssafy.floraserver.db.entity.User;
import com.ssafy.floraserver.db.entity.enums.Role;
import com.ssafy.floraserver.db.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseCookie;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Optional;

@Slf4j
@Component
@RequiredArgsConstructor
public class OAuth2LoginSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

//    private final TokenProvider tokenProvider;
    private final JwtProvider jwtProvider;
    private final UserRepository userRepository;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
        log.info("Handler 들어왔다" );
        try {
            CustomOAuth2User oAuth2User = (CustomOAuth2User) authentication.getPrincipal();

            log.info(authentication.getAuthorities().toString()); // [ROLE_GUEST]
            log.info(((CustomOAuth2User) authentication.getPrincipal()).getUId().toString()); // 7
            String uId = ((CustomOAuth2User) authentication.getPrincipal()).getUId().toString();
            log.info(String.valueOf(oAuth2User));
            log.info(oAuth2User.getEmail());
//            log.info(String.valueOf(oAuth2User));
//            log.info(authentication.getName());
            String accessToken = jwtProvider.createAccessToken(authentication, uId);
            String refreshToken = jwtProvider.createRefreshToken(authentication);

            log.info("accessToken : {}", accessToken);
            log.info("refreshToken : {}", refreshToken);
            log.info("OAuth2LoginSuccessHandler");
            saveOrUpdateUser(refreshToken, oAuth2User);

            ResponseCookie cookie = ResponseCookie.from("refresh", refreshToken)
                    .httpOnly(true)
                    .maxAge(jwtProvider.REFRESH_TOKEN_VALIDATE_TIME)
                    .path("/")
                    .build();
            
            clearAuthenticationAttrubutes(request, response);

            response.addHeader("Set-Cookie", cookie.toString());
            response.getWriter().write(accessToken);

            // 처음 요청한 사용자는 회원가입 페이지로
            if(oAuth2User.getRole() == Role.GUEST){
                log.info("GUEST");

                // 추가정보 입력 페이지로 이동
//                response.sendRedirect("http://localhost:8080/guest");//프론트엔드의 회원가입 주소로 reDirect

            }else {
                log.info("CUSTOMER OR STORE");
            }
        }catch (Exception e){
            throw e;
        }
    }

    private void clearAuthenticationAttrubutes(HttpServletRequest request, HttpServletResponse response) {
        super.clearAuthenticationAttributes(request);
    }

    private void saveOrUpdateUser(String refreshToken, CustomOAuth2User oAuth2User) {

        Optional<User> optionalUser = userRepository.findByEmail(oAuth2User.getEmail());
        User user;

        if(optionalUser.isEmpty()){
            user = User.builder()
                    .email(oAuth2User.getEmail())
                    .refreshToken(refreshToken)
                    .build();
        }else{
            user = optionalUser.get();
            user.updateRefreshToken(refreshToken);
        }

        userRepository.save(user);
    }
}
