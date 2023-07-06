package com.bobfriends.bf.comment.dto;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Positive;
import java.time.LocalDateTime;

public class CommentDto {
    @Getter
    @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class Post {
        private Long postId;
        @Positive
        private Long memberId;
        @NotBlank
        private String content;
        public void addPostId(Long postId){
            this.postId = postId;
        }
    }
    @Getter
    @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class Patch{
        private Long commentId;
        private Long postId;
        @Positive
        private Long memberId;
        @NotBlank
        private String content;
        public void addCommentId(Long commentId){
            this.commentId = commentId;
        }
        public void addPostId(Long postId){
            this.postId = postId;
        }

    }
    @Getter
    @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class Response {
        private Long commentId;
        private Long postId;
        private Long memberId;
        private String name;
        private float avgStarRate;
        private String content;
        private LocalDateTime createdAt;
        private LocalDateTime modifiedAt;

    }

    @Getter @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class DetailResponse {

        private long commentId;
        private String content;
        private long memberId;
        private float avgStarRate;
        private String name;
        private LocalDateTime createdAt;
    }
}
