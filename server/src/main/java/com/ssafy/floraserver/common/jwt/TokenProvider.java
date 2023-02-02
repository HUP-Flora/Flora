package com.ssafy.floraserver.common.jwt;

import com.ssafy.floraserver.common.auth.CustomOAuth2User;
import io.jsonwebtoken.*;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Arrays;
import java.util.Collection;
import java.util.Date;
import java.util.stream.Collectors;

@Slf4j
@Component
public class TokenProvider implements InitializingBean {

    private static final String AUTHORITIES_KEY = "auth";

    private static final Long ACCESS_TOKEN_VALIDATE_TIME = 1000L;
    public static final Long REFRESH_TOKEN_VALIDATE_TIME = 1000L * 60 * 60 * 24 * 7;
    private final String secret;

    private Key key;

    public TokenProvider(
            @Value("${jwt.secret}") String secret) {
        this.secret = secret;
    }  @Override
    public void afterPropertiesSet() throws Exception {
        byte[] keyBytes = Decoders.BASE64.decode(secret);
        // TokenProvider 빈이 생성되고 의존성 주입을 받은 후에 secret 값을 Base64 Decode 해서 key 변수에 할당하기 위해.
        this.key = Keys.hmacShaKeyFor(keyBytes);
    }

    // Authentication 객체의 권한정보를 담은 토큰을 생성하는 createAccessToken 메소드 추가
    public String createAccessToken(Authentication authentication) {

        CustomOAuth2User oAuth2User = (CustomOAuth2User) authentication.getPrincipal();

        String email = oAuth2User.getEmail();

        // 권한들
        String authorities = authentication.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.joining(","));

        // 만료시간
        long now = (new Date()).getTime();
        Date validity = new Date(now + ACCESS_TOKEN_VALIDATE_TIME);

        // 생성해서 리턴
        return Jwts.builder()
                .setSubject(email)
                .claim(AUTHORITIES_KEY, authorities)
                .signWith(SignatureAlgorithm.HS512, key)
                .setExpiration(validity)
                .compact();
    }

    public String createRefreshToken(Authentication authentication){
        // 만료시간
        long now = (new Date()).getTime();
        Date validity = new Date(now + REFRESH_TOKEN_VALIDATE_TIME);

        return Jwts.builder()
                .signWith(SignatureAlgorithm.HS512, key)
                .setExpiration(validity)
                .compact();
    }

    // 토큰을 받아서 토큰에 담겨있는 정보를 이용해 Authentication 객체를 리턴하는 메소드
    // 토큰으로 클레임을 만들고 이를 이용해 유저 객체를 만들어서 최종적으로 Authentication 객체를 리턴
    public Authentication getAuthentication(String token) {
        Claims claims = Jwts
                .parser()
                .setSigningKey(key)
                .parseClaimsJws(token)
                .getBody();

        Collection<? extends GrantedAuthority> authorities =
                Arrays.stream(claims.get(AUTHORITIES_KEY).toString().split( ","))
                        .map(SimpleGrantedAuthority::new)
                        .collect(Collectors.toList());

        User principal = new User(claims.getSubject(), "", authorities);

        return new UsernamePasswordAuthenticationToken(principal, token, authorities);
    }

    // 토큰을 파라미터로 받아서 토큰의 유효성 검증을 수행하는 메소드
    public boolean validateToken(String token) {
        try {
            Jwts.parser().setSigningKey(key).parseClaimsJws(token);
            return true;
        } catch (io.jsonwebtoken.security.SecurityException | MalformedJwtException e) {
            log.info("잘못된 JWT 서명입니다.");
        } catch (ExpiredJwtException e) {
            log.info("만료된 JWT 토큰입니다.");
        } catch (UnsupportedJwtException e) {
            log.info("지원되지 않는 JWT 토큰입니다.");
        } catch (IllegalArgumentException e) {
            log.info("JWT 토큰이 잘못되었습니다.");
        }
        return false;
    }
}
