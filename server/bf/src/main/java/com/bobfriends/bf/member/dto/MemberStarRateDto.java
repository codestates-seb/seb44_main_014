package com.bobfriends.bf.member.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Positive;


public class MemberStarRateDto {
    @Getter
    @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class Post {
        private Long postId;
        @Positive
        private Long rateMemberId;
        @NotBlank
        private float starRate;

        public void addPostId(Long postId){
            this.postId = postId;
        }
    }
    @Getter
    @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class Response{
        private Long memberStarRateId;
        private Long postMemberId;
        private Long rateMemberId;
        private float starRate;
    }
}
