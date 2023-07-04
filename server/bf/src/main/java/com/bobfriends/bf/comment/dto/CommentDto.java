package com.bobfriends.bf.comment.dto;

import com.bobfriends.bf.member.entity.Member;
import com.bobfriends.bf.question.entity.Question;
import lombok.Getter;
import lombok.Setter;
import org.springframework.stereotype.Controller;

import javax.validation.constraints.NotBlank;
import java.time.LocalDateTime;

public class CommentDto {
    @Getter
    @Setter
    public static class Post {
        private long questionId;
        private long memberId;
        @NotBlank
        private String content;

        public Member getMember() {
            Member member = new Member();
            member.setMemberId(memberId);
            return member;
        }
        public Question getQuestion() {
            Question question = new Question();
            question.setQuestionId(questionId);
            return question;
        }
    }
    @Getter
    @Setter
    public static class Patch{
        private long commentId;
        private long questionId;
        private long memberId;
        @NotBlank
        private String content;

    }
    @Getter
    public static class Response {
        private long commentId;
        private long questionId;
        private long memberId;
        private String name;
        private float avgStarRate;
        private String content;
        private LocalDateTime createdAt;
        private LocalDateTime modifiedAt;

        public void setMember(Member member){
            this.name = member.getName();
            this.avgStarRate = member.getAvgStarRate();
        }
    }
}
