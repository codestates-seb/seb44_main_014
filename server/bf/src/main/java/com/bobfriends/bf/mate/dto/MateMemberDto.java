package com.bobfriends.bf.mate.dto;

import com.bobfriends.bf.member.entity.Member;
import com.bobfriends.bf.post.entity.Post;
import lombok.*;

import javax.validation.constraints.Positive;
import java.util.List;

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
    @Getter @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    public static class MateMemberGetResponse{
        private Long memberId;
        private String name;
        private String image;
        private Member.genderStatus gender;
        private float avgStarRate;
        private boolean eatStatus;
    }
    @Getter @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    public static class MateMemberGetResponses{
        private List<MateMemberGetResponse> mate_member;
        private Post.recruitStatus status;
    }
}
