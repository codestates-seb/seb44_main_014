package com.bobfriends.bf.comment.dto;

import com.bobfriends.bf.member.entity.Member;
import com.bobfriends.bf.question.entity.Question;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.stereotype.Controller;

import javax.validation.constraints.NotBlank;
import java.time.LocalDateTime;

public class CommentDto {
    @Getter
    @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class Post {
        private long questionId;
        private long memberId;
        @NotBlank
        private String content;
        public void addQuestionId(long questionId){
            this.questionId = questionId;
        }
        public Member getMember() {
            Member member = new Member();
            member.setMemberId(memberId);
            return member;
        }
//        public Question getQuestion() {
//            Question question = new Question();
//            question.setQuestionId(questionId);
//            return question;
//        }
    }
    @Getter
    @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class Patch{
        private long commentId;
        private long questionId;
        @NotBlank
        private String content;
        public void addCommentId(long commentId){
            this.commentId = commentId;
        }
        public void addQuestionId(long questionId){
            this.questionId = questionId;
        }

    }
    @Getter
    @Setter
    @AllArgsConstructor
    @NoArgsConstructor
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
