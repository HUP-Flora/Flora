package com.ssafy.floraserver.db.entity;

import com.ssafy.floraserver.db.entity.enums.UserType;
import com.ssafy.floraserver.db.entity.enums.Role;

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

//    @Enumerated(EnumType.STRING)
//    @Column(name = "u_type", nullable = false)
//    private UserType type;

    @Enumerated(EnumType.STRING)
    @Column(name = "u_role")
    private Role role;

    @Column(name = "u_email", nullable = false, unique = true)
    private String email;

    @Column(name = "u_nickname", unique = true)
    private String nickname;

    @Column(name = "u_phone_number")
    private String phoneNumber;

    @Column(name = "u_refresh_token")
    private String refreshToken;

    @Column(name = "u_withdrawal_date")
    private LocalDate withdrawalDate;

    @Column(name = "u_soft_delete", columnDefinition = "TINYINT(1)")
    private boolean softDelete;

    @Builder
    public User(Role role, String email, String nickname, String phoneNumber) {
        this.role = role;
        this.email = email;
        this.nickname = nickname;
        this.phoneNumber = phoneNumber;
    }
}
