package com.ssafy.floraserver.config;

import com.ssafy.floraserver.common.util.SecurityUtil;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.domain.AuditorAware;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Slf4j
//@Component
public class AuditConfig implements AuditorAware<Long> {

    @Override
    public Optional<Long> getCurrentAuditor() {
        log.info("들어오긴하니");
        log.info(SecurityContextHolder.getContext().getAuthentication().toString());
        log.info("AuditConfig : {}", Long.parseLong(SecurityUtil.getCurrentUser().get("uId")));

        return null;
    }
}
