package com.ssafy.floraserver.common.auth;

import com.ssafy.floraserver.common.jwt.JwtProvider;
import com.ssafy.floraserver.common.util.SecurityUtil;
import com.ssafy.floraserver.db.entity.User;
import com.ssafy.floraserver.db.entity.enums.Role;
import javax.servlet.http.Cookie;
import com.ssafy.floraserver.db.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseCookie;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import org.springframework.web.util.UriComponentsBuilder;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.net.URI;
import java.util.Optional;

@Slf4j
@Component
@RequiredArgsConstructor
public class OAuth2LoginSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

    private final JwtProvider jwtProvider;
    private final UserRepository userRepository;

    public static final String AUTH_HEADER = "Authorization";
    public static final String TOKEN_TYPE = "Bearer";

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
        log.info("Handler 들어왔다" );
        try {
            CustomOAuth2User oAuth2User = (CustomOAuth2User) authentication.getPrincipal();

            Optional<String> redirectUri = SecurityUtil.getCookie(request, "redirect-uri")
                    .map(Cookie::getValue);

            if (redirectUri.isPresent() && !isAuthorizedRedirectUri(redirectUri.get())) {
                throw new IllegalArgumentException(("Authentication Failed: Unauthorized Redirect URI"));
            }

            log.info(authentication.getAuthorities().toString()); // [ROLE_GUEST]
            log.info(((CustomOAuth2User) authentication.getPrincipal()).getUId().toString()); // 7
            String uId = ((CustomOAuth2User) authentication.getPrincipal()).getUId().toString();
            log.info(String.valueOf(oAuth2User));
            log.info(oAuth2User.getEmail());

            String accessToken = jwtProvider.createAccessToken(authentication, uId, authentication.getAuthorities().toString());
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

            response.addHeader(AUTH_HEADER, TOKEN_TYPE + " " + accessToken);
            response.addHeader("Set-Cookie", cookie.toString());
//            response.getWriter().write(accessToken);


            String targetUrl;
            // 처음 요청한 사용자는 회원가입 페이지로
            if(oAuth2User.getRole() == Role.GUEST){
                log.info("GUEST");
                // http://localhost:3000/signup?token={accessToken}
                targetUrl = UriComponentsBuilder.fromUriString("http://localhost:3000/signup")
                        .queryParam("token", accessToken)
                        .build().toUriString();
            }else {
                log.info("CUSTOMER OR STORE");
                targetUrl = UriComponentsBuilder.fromUriString(redirectUri.orElse("http://localhost:3030"))
                        .queryParam("token", accessToken)
                        .build().toUriString();
            }

            getRedirectStrategy().sendRedirect(request, response, targetUrl);

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

    private boolean isAuthorizedRedirectUri(String uri) {

        URI clientRedirectUri = URI.create(uri);
        if(clientRedirectUri.getHost().equals("http://localhost:8080")){
            return true;
        }
        return false;
    }
}
