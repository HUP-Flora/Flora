package com.ssafy.floraserver.common.jwt;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.floraserver.common.exception.ErrorCode;
import io.jsonwebtoken.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

@Slf4j
@RequiredArgsConstructor
@Component
public class JwtExceptionFilter extends OncePerRequestFilter {

    private final ObjectMapper objectMapper;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        response.setCharacterEncoding("utf-8");

        try {
            filterChain.doFilter(request, response); // JwtAuthenticationFilter로 이동
        } catch (ExpiredJwtException e) {
            log.info("만료된 토큰입니다.");
            setErrorResponse(request, response, ErrorCode.EXPIRED_TOKEN, e);
        } catch (UnsupportedJwtException e) {
            log.info("지원되지 않는 토큰입니다.");
            setErrorResponse(request, response, ErrorCode.UNSUPPORTED_TOKEN, e);
        } catch (Exception e) {
            log.info("토큰이 잘못되었습니다.");
            setErrorResponse(request, response, ErrorCode.WRONG_TOKEN, e);
        }
    }

    public void setErrorResponse(HttpServletRequest req, HttpServletResponse res, ErrorCode code, Throwable ex) throws IOException {

        res.setContentType(MediaType.APPLICATION_JSON_VALUE);

        final Map<String, Object> body = new HashMap<>();
        body.put("status", HttpServletResponse.SC_UNAUTHORIZED);
        body.put("error", code.name());
        body.put("message", ex.getMessage());
        body.put("path", req.getServletPath());
        final ObjectMapper mapper = new ObjectMapper();
        res.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
        mapper.writeValue(res.getOutputStream(), body);

    }
}
