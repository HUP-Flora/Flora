package com.ssafy.floraserver.config;

import com.ssafy.floraserver.common.auth.CustomOAuth2UserService;
import com.ssafy.floraserver.common.auth.OAuth2LoginSuccessHandler;
import com.ssafy.floraserver.common.jwt.JwtAccessDeniedHandler;
import com.ssafy.floraserver.common.jwt.JwtAuthenticationEntryPoint;
import com.ssafy.floraserver.common.jwt.TokenProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.filter.CorsFilter;

@RequiredArgsConstructor
@EnableWebSecurity
@EnableMethodSecurity
public class SecurityConfig {

    private final CustomOAuth2UserService customOAuth2UserService;
    private final OAuth2LoginSuccessHandler oAuth2LoginSuccessHandler;
    private final TokenProvider tokenProvider;
    private final CorsFilter corsFilter;
    private final JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint;
    private final JwtAccessDeniedHandler jwtAccessDeniedHandler;

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .csrf().disable()

                .authorizeRequests()
                .antMatchers(HttpMethod.GET, "/users").authenticated()
                .anyRequest().permitAll()

                .and()
                .addFilterBefore(corsFilter, UsernamePasswordAuthenticationFilter.class)

                .exceptionHandling()
                .authenticationEntryPoint(jwtAuthenticationEntryPoint)
                .accessDeniedHandler(jwtAccessDeniedHandler)

                // 세션을 사용하지 않으므로 STATELESS로 설정
                .and()
                .sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)

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
