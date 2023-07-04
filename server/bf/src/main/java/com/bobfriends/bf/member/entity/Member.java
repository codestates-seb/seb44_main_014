package com.bobfriends.bf.member.entity;

import com.bobfriends.bf.audit.Auditable;
import com.bobfriends.bf.comment.entity.Comment;
import com.bobfriends.bf.mate.entity.MateMember;
import com.bobfriends.bf.question.entity.Question;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;
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
    @OneToMany(mappedBy = "questionMember")
    private List<MemberStarRate> questionMemberStarRates = new ArrayList<>();

    @OneToMany(mappedBy = "member")
    private List<MateMember> mateMembers = new ArrayList<>();

    @OneToMany(mappedBy = "member")
    private List<Question> questions = new ArrayList<>();

    @OneToMany(mappedBy = "member")
    private List<Comment> comments = new ArrayList<>();

    @OneToMany(mappedBy = "member")
    private List<MemberTag> memberTags = new ArrayList<>();

    public List<MemberTag> getMemberTags() {
        return memberTags;
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

