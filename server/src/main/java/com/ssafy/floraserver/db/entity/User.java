package com.ssafy.floraserver.db.entity;

import com.ssafy.floraserver.db.entity.enums.UserType;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "users")
@NoArgsConstructor
@Getter
public class User extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long uId;

    @Enumerated(EnumType.STRING)
    @Column(name = "u_type", nullable = false)
    private UserType uType;

    @Column(name = "u_email", nullable = false, unique = true)
    private String uEmail;

    @Column(name = "u_nickname", unique = true)
    private String uNickname;

    @Column(name = "u_phone_number")
    private String uPhoneNumber;

    @Column(name = "u_refresh_token")
    private String uRefreshToken;

    @Column(name = "u_withdrawal_date")
    private LocalDate uWithdrawalDate;

    @Column(name = "u_soft_delete", columnDefinition = "TINYINT(1)")
    private boolean uSoftDelete;

    @Builder
    public User(Long uId, UserType uType, String uEmail, String uNickname, String uPhoneNumber ){
        this.uId = uId;
        this.uType = uType;
        this.uEmail = uEmail;
        this.uNickname = uNickname;
        this.uPhoneNumber = uPhoneNumber;
    }

}
