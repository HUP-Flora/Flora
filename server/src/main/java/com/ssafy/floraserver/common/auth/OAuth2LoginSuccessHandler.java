package com.ssafy.floraserver.common.auth;

import com.ssafy.floraserver.db.entity.enums.Role;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.token.TokenService;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Slf4j
@Component
@RequiredArgsConstructor
public class OAuth2LoginSuccessHandler implements AuthenticationSuccessHandler {

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
        log.info("Handler 들어왔다" );
        try {
            CustomOAuth2User oAuth2User = (CustomOAuth2User) authentication.getPrincipal();

            if(oAuth2User.getRole() == Role.GUEST){
                log.info("GUEST");
//                String accessToken = tokenService.createAccessToken(oAuth2User.getUsername());
//                response.addHeader(tokenService.getAccessHeader(), "Bearer "+accessToken);

                // 추가정보 입력 페이지로 이동
                response.sendRedirect("http://localhost:8080/guest");//프론트엔드의 회원가입 주소로 reDirect

            }else {
                log.info("CUSTOMER OR STORE");
//                loginSuccess(response, oAuth2User);//로그인에 성공한 경우
            }
        }catch (Exception e){
            throw e;
        }
    }
}
