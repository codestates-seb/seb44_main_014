package com.bobfriends.bf.member.entity;

import com.bobfriends.bf.audit.Auditable;
import com.bobfriends.bf.question.entity.Question;
import com.fasterxml.jackson.annotation.JsonBackReference;
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
    @JoinColumn(name = "QUESTION_ID")
    private Question question;

    @ManyToOne
    @JoinColumn(name = "QUESTION_MEMBER_ID")
    private Member questionMember;

    @ManyToOne
    @JoinColumn(name = "RATE_MEMBER_ID")
    private Member rateMember;
}
