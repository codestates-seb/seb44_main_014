package com.bobfriends.bf.member.entity;

import com.bobfriends.bf.audit.Auditable;
import com.bobfriends.bf.post.entity.Post;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name = "MEMBER_STAR_RATE")
public class MemberStarRate extends Auditable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "member_star_rate_id")
    private Long memberStarRateId;

    private int starRate;

    @ManyToOne
    @JoinColumn(name = "POST_ID")
    private Post post;

    @ManyToOne
    @JoinColumn(name = "POST_MEMBER_ID")
    private Member postMember;

    @ManyToOne
    @JoinColumn(name = "RATE_MEMBER_ID")
    private Member rateMember;
}
