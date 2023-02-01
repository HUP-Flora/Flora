package com.ssafy.floraserver.db.entity;

import com.ssafy.floraserver.db.entity.enums.UserType;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "users")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
public class User extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long uId;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private UserType type;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(unique = true)
    private String nickname;

    private String phoneNumber;

    private String refreshToken;

    private LocalDate withdrawalDate;

    @Column(columnDefinition = "TINYINT(1)")
    private boolean softDelete;

    @Builder
    public User(Long uId, UserType type, String email, String nickname, String phoneNumber){
        this.uId = uId;
        this.type = type;
        this.email = email;
        this.nickname = nickname;
        this.phoneNumber = phoneNumber;
    }

}
