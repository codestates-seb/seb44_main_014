package com.bobfriends.bf.mate.entity;

import com.bobfriends.bf.member.entity.Member;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class MateMember {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "mate_member_id")
    private Long mateMemberId;
    @ManyToOne
    @JoinColumn(name = "MATE_ID")
    private Mate mate;

    @ManyToOne
    @JoinColumn(name = "MEMBER_ID")
    private Member member;
}
