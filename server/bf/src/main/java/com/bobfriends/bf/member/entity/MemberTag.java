package com.bobfriends.bf.member.entity;

import com.bobfriends.bf.tag.entity.FoodTag;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class MemberTag {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "member_tag_id")
    private Long memberTagId;
    @OneToOne
    @JoinColumn(name = "MEMBER_ID")
    private Member member;
    @ManyToOne
    @JoinColumn(name = "FOOD_TAG_ID")
    private FoodTag foodTag;
}
