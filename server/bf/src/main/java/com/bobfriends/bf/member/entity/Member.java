package com.bobfriends.bf.member.entity;

import com.bobfriends.bf.audit.Auditable;
import com.bobfriends.bf.comment.entity.Comment;
import com.bobfriends.bf.mate.entity.MateMember;
import com.bobfriends.bf.post.entity.Post;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Member extends Auditable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "member_id")
    private Long memberId;

    private String image;

    private String name;

    @Column(nullable = false)
    private String email;

    private String password;

    @Enumerated(value = EnumType.STRING)
    private genderStatus gender;

    private String location;

    private float avgStarRate;

    private boolean eatStatus=false;

    @OneToMany(mappedBy = "rateMember")
    private List<MemberStarRate> rateMemberStarRates = new ArrayList<>();

    @JsonIgnoreProperties("mate")
    @OneToMany(mappedBy = "postMember")
    private List<MemberStarRate> postMemberStarRates = new ArrayList<>();

    @OneToMany(mappedBy = "member")
    private List<MateMember> mateMembers = new ArrayList<>();

    @OneToMany(mappedBy = "member")
    private List<Post> posts = new ArrayList<>();

    @OneToMany(mappedBy = "member")
    private List<Comment> comments = new ArrayList<>();

    @OneToOne(mappedBy = "member", cascade = CascadeType.PERSIST)
    private MemberTag memberTag;

    public MemberTag getMemberTag() {
        return memberTag;
    }

    public enum genderStatus {
        FEMALE("여성"),
        MALE("남성");

        private String status;

        genderStatus(String status) {
            this.status = status;
        }

        public String getStatus() {
            return status;
        }
    }
    }

