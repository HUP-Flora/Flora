package com.ssafy.floraserver.api.service;

import io.openvidu.java.client.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

@Service
@Slf4j
@Transactional
@RequiredArgsConstructor
public class OpenViduService {

    private final OpenVidu openVidu;

    // cusomSesstionId = 주문번호
    // 세션 만들기
    public String createSession(String customSessionId) throws OpenViduHttpException, OpenViduJavaClientException {
        openVidu.fetch();
        if (openVidu.getActiveSession(customSessionId) != null) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN);
        }
        // customId로 활성화 된 세션 가져옴
        SessionProperties properties = SessionProperties.fromJson(null).customSessionId(customSessionId).build();
        // 세션 아이디 돌려줌
        return openVidu.createSession(properties).getSessionId();
    }

    // 커넥션은 세션에서 만들어야 해서 세션 아이디 필요
    public String createConnectionToken(String sessionId) throws OpenViduHttpException, OpenViduJavaClientException {
        openVidu.fetch();
        Session session = openVidu.getActiveSession(sessionId);

        if(session == null) {}

        ConnectionProperties connectionProperties;
        connectionProperties = ConnectionProperties.fromJson(null).build();
        // 토큰 반환
        return session.createConnection(connectionProperties).getToken();
    }

    // 세션 닫기
    public void closeSession(String sessionId) throws OpenViduHttpException, OpenViduJavaClientException {
        Session session = openVidu.getActiveSession(sessionId);

        if(session == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }
        session.close();
    }
}
