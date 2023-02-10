package com.ssafy.floraserver.config;

import com.ssafy.floraserver.common.util.SecurityUtil;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.AuditorAware;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Slf4j
@Component
public class AuditConfig implements AuditorAware<String> {

    @Override
    public Optional<String> getCurrentAuditor() {

        try{
            return Optional.ofNullable(SecurityUtil.getCurrentUser().get("uId"));
        }catch (Exception e){
            return null;
        }

    }
}
