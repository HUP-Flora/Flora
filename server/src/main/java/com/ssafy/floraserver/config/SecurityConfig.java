package com.ssafy.floraserver.config;

import com.ssafy.floraserver.common.auth.CustomOAuth2UserService;
import com.ssafy.floraserver.common.auth.OAuth2LoginSuccessHandler;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;

@RequiredArgsConstructor
@EnableWebSecurity
public class SecurityConfig {

    private final CustomOAuth2UserService customOAuth2UserService;
    private final OAuth2LoginSuccessHandler oAuth2LoginSuccessHandler;
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .csrf().disable()

                .authorizeRequests()
                .antMatchers(HttpMethod.GET, "/users").authenticated()
                .anyRequest().permitAll()

                .and()
                .formLogin().disable() // FormLogin 사용하지않음

                // 소셜 로그인 설정
                .oauth2Login()
                .successHandler(oAuth2LoginSuccessHandler)//동의하고 계속하기를 눌렀을때,
                .userInfoEndpoint()
                .userService(customOAuth2UserService);//userService 설정

        return http.build();
    }
}
