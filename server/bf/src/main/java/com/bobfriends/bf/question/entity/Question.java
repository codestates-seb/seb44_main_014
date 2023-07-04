package com.bobfriends.bf.question.entity;

import com.bobfriends.bf.audit.Auditable;
import com.bobfriends.bf.comment.entity.Comment;
import com.bobfriends.bf.mate.entity.Mate;
import com.bobfriends.bf.member.entity.MemberStarRate;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import com.bobfriends.bf.member.entity.Member;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Question extends Auditable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "question_id")
    private Long questionId;

    @Enumerated(value = EnumType.STRING)
    private categoryStatus category;

    @Column(nullable = false,length = 60)
    private String title;

    @Column(nullable = false,length = 300)
    private String content;

    private String image;

    @Column(nullable = false)
    private String location;

    @Enumerated(value = EnumType.STRING)
    private recruitStatus status = recruitStatus.RECRUITING;

    private int viewCount;

    private int commentCount;

    @OneToOne(mappedBy = "question", cascade = {CascadeType.PERSIST, CascadeType.REMOVE})
    private Mate mate;

    @OneToMany(mappedBy = "question", cascade = CascadeType.REMOVE)
    private List<MemberStarRate> memberStarRates = new ArrayList<>();

    @ManyToOne
    @JoinColumn(name = "MEMBER_ID")
    private Member member;

    @OneToMany(mappedBy = "question", cascade = CascadeType.REMOVE)
    private List<Comment> comments = new ArrayList<>();

    @OneToOne(mappedBy = "question", cascade = {CascadeType.PERSIST, CascadeType.REMOVE, CascadeType.MERGE})
    private QuestionTag questionTag;

    /** commentCount **/
    public void setCommentCount(){
        this.commentCount = comments.size();
    }

    public enum categoryStatus {
        EATING("밥먹기"),
        SHOPPING("장보기");

        @Getter
        private String status;

        categoryStatus(String status) {
            this.status = status;
        }
    }

    public enum recruitStatus{
        RECRUITING("모집중"),
        COMPLETE("모집완료"),
        END("모임종료");
        @Getter
        private String status;

        recruitStatus(String status) {
            this.status = status;
        }
    }
}
