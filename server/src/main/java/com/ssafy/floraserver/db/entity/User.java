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
    private UserType uType;

    @Column(nullable = false, unique = true)
    private String uEmail;

    @Column(unique = true)
    private String uNickname;

    private String uPhoneNumber;

    private String uRefreshToken;

    private LocalDate uWithdrawalDate;

    @Column(columnDefinition = "TINYINT(1)")
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
