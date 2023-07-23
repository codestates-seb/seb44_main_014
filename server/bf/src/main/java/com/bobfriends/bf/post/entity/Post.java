package com.bobfriends.bf.post.entity;

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
public class Post extends Auditable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "post_id")
    private Long postId;

    @Enumerated(value = EnumType.STRING)
    private categoryStatus category;

    @Column(nullable = false ,length = 60)
    private String title;

    @Column(nullable = false ,length = 300)
    private String content;

    @Enumerated(value = EnumType.STRING)
    private recruitStatus status = recruitStatus.RECRUITING;

    private int viewCount;

    @OneToOne(mappedBy = "post", cascade = {CascadeType.PERSIST, CascadeType.REMOVE})
    private Mate mate;

    @OneToMany(mappedBy = "post", cascade = CascadeType.REMOVE)
    private List<MemberStarRate> memberStarRates = new ArrayList<>();

    @ManyToOne
    @JoinColumn(name = "MEMBER_ID")
    private Member member;

    @OneToMany(mappedBy = "post", cascade = CascadeType.REMOVE)
    private List<Comment> comments = new ArrayList<>();

    @OneToOne(mappedBy = "post", cascade = {CascadeType.PERSIST, CascadeType.REMOVE, CascadeType.MERGE})
    private PostTag postTag;

    public Post(categoryStatus category, String title, String content, recruitStatus status, int viewCount) {
        this.category = category;
        this.title = title;
        this.content = content;
        this.status = status;
        this.viewCount = viewCount;
    }

    /** viewCount 증가 **/
    public void addViewCount(int viewCount){
        this.viewCount = viewCount + 1;
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
