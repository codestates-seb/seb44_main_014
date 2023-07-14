package com.bobfriends.bf.mate.dto;

import lombok.*;

import javax.validation.constraints.Positive;

public class MateMemberDto {

    @Getter @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class DetailResponse{

        private long mateMemberId;

        private String name;
    }
    @Getter @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    public static class PostMateMember{
        @Positive
        private Long memberId;
        private Long postId;
        public void addPostId(Long postId){
            this.postId = postId;
        }
    }
    @Getter @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    public static class MateMemberResponse{
        private Long findNum;
        private int mateNum;

    }
}
