package com.ssafy.floraserver.config;

import com.ssafy.floraserver.common.auth.CustomOAuth2UserService;
import com.ssafy.floraserver.common.auth.OAuth2LoginSuccessHandler;
import com.ssafy.floraserver.common.jwt.JwtAccessDeniedHandler;
import com.ssafy.floraserver.common.jwt.JwtAuthenticationEntryPoint;
import com.ssafy.floraserver.common.jwt.JwtFilter;
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
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

@RequiredArgsConstructor
@EnableWebSecurity
@EnableMethodSecurity
public class SecurityConfig {

    private final CustomOAuth2UserService customOAuth2UserService;
    private final OAuth2LoginSuccessHandler oAuth2LoginSuccessHandler;

    private final JwtFilter jwtFilter;
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
                .httpBasic().disable()
                .formLogin().disable() // FormLogin 사용하지않음

                // CORS 허용 설정
                .cors().configurationSource(corsConfigurationSource())

                // URL 권한 설정
                .and()
                .authorizeRequests()
                .antMatchers(HttpMethod.GET, "/api/auth/users").authenticated()
                .antMatchers(HttpMethod.PUT, "/api/auth/stores").authenticated()
                .anyRequest().permitAll()
                .and()
                .logout()
                .logoutUrl("/api/auth/logout")
                .permitAll()


                // JWT 설정
                .and()
                .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class)

                // 예외 설정
                .exceptionHandling()
                .authenticationEntryPoint(jwtAuthenticationEntryPoint)
                .accessDeniedHandler(jwtAccessDeniedHandler)

                // 세션을 사용하지 않으므로 STATELESS로 설정
                .and()
                .sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)

                // 소셜 로그인 설정
                .and()
                .oauth2Login()
                .successHandler(oAuth2LoginSuccessHandler)// 동의하고 계속하기를 눌렀을때,
                .userInfoEndpoint()
                .userService(customOAuth2UserService);// userService 설정

        return http.build();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource(){
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();

        CorsConfiguration config = new CorsConfiguration();

        config.setAllowCredentials(true);
        config.addAllowedOrigin("*"); // 허용할 URL
        config.addAllowedHeader("*"); // 허용할 Header
        config.addAllowedMethod("*"); // 허용할 Http Method

        source.registerCorsConfiguration("*", config);

        return source;
    }
}
