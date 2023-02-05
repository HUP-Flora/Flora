package com.ssafy.floraserver.db.entity;

import lombok.Getter;
import net.bytebuddy.asm.Advice;
import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedBy;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.Column;
import javax.persistence.EntityListeners;
import javax.persistence.MappedSuperclass;
import java.time.LocalDateTime;

@MappedSuperclass
@EntityListeners(AuditingEntityListener.class)
@Getter
public abstract class BaseEntity {

    @CreatedBy
    @Column(updatable = false)
    private Long creator;

    @CreatedDate
    @Column(insertable = true, updatable = false)
    private LocalDateTime createdAt;

    @LastModifiedBy
    private Long updater;

    @LastModifiedDate
    @Column(insertable = true, updatable = true)
    private LocalDateTime updatedAt;

}
