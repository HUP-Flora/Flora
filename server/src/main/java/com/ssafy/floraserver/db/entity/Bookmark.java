package com.ssafy.floraserver.db.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Table(name = "bookmarks")
@NoArgsConstructor
@Getter
public class Bookmark extends BaseEntity{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long bId;

    // 연관관계 필요
    private Long uId;
    
    // 연관관계 필요
    private Long sId;
}
