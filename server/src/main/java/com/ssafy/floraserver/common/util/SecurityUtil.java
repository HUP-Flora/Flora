package com.ssafy.floraserver.common.util;

import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;


@Slf4j
public class SecurityUtil {

    // API 호출 시 헤더에 담겨져있는 사용자 정보를 알 수 있다.
    public static Map<String, String> getCurrentUser() {
        final Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || authentication.getName() == null) {
            throw new RuntimeException("No authentication information.");
        }
        log.info("여기에 id가 들어갈까");
        log.info(((User) authentication.getPrincipal()).getPassword());
        Map<String, String> authInfo = new HashMap<>();
        authInfo.put("uId", ((User) authentication.getPrincipal()).getPassword());
        authInfo.put("email", authentication.getName());
        authInfo.put("role", authentication.getAuthorities().toString());
        return authInfo;
    }

    public static Optional<Cookie> getCookie(HttpServletRequest request, String name){
        Cookie[] cookies = request.getCookies();
        if(cookies != null && cookies.length > 0){
            for(Cookie cookie : cookies){
                if(cookie.getName().equals(name)){
                    return Optional.of(cookie);
                }
            }
        }
        return Optional.empty();
    }

}
