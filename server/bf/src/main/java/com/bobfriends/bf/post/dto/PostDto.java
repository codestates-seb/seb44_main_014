package com.bobfriends.bf.post.dto;

import com.bobfriends.bf.mate.dto.MateDto;
import com.bobfriends.bf.mate.dto.MateMemberDto;
import com.bobfriends.bf.post.entity.Post.categoryStatus;
import com.bobfriends.bf.post.entity.Post.recruitStatus;
import lombok.*;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Positive;
import java.time.LocalDateTime;
import java.util.List;

public class PostDto {

    @Getter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class Post {

        @Positive
        private long memberId;

        @NotBlank
        private categoryStatus category;

        @NotBlank
        private String title;

        @NotBlank
        private String content;

        private String image;

        /** 태그 하나만 등록 가능 (선택)
         *  - default : 상관없음
         */
        private PostTagDto.GenderTagPost genderTag;

        /** 태그 하나만 등록 가능 (선택)
         *  - default : 기타
         */
        private PostTagDto.FoodTagPost foodTag;

        @NotBlank
        private MateDto.Post mate;

        @NotBlank
        private String location;
    }


    @Getter
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Patch {

        @Positive
        private long postId;

        @Positive
        private long memberId;

        private categoryStatus category;

        private String title;

        private String content;

        private String image;

        private PostTagDto.GenderTagPost genderTag;

        private PostTagDto.FoodTagPost foodTag;

        private MateDto.Post mate;

        private String location;

        private recruitStatus status;

        public void addPostId(long postId){
            this.postId = postId;
        }
    }


    @Getter @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    @Builder
    public static class PatchResponse {

        @Positive
        private long postId;

        @Positive
        private long memberId;

        private categoryStatus category;

        private String title;

        private String content;

        private String image;

        private PostTagDto.Response postTag;

        private MateDto.PatchResponse mate;

        private String location;

        private recruitStatus status;
    }


    @Getter @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    @Builder
    public static class DetailResponse {

        private String title;

        private String content;

        private String image;

        private LocalDateTime createdAt;

        private int viewCount;

        private int commentCount;

        private String location;

        private recruitStatus status;

        private categoryStatus category;

        // memberResponse 가져오기

        private PostTagDto.Response postTag;

        private MateDto.DetailResponse mate;

        private List<MateMemberDto.DetailResponse> mateMembers;

        // comments 가져오기
    }


    @Getter @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    @Builder
    public static class Response {

        @Positive
        private long postId;

        @Positive
        private long memberId;

        private String name;

        private float avgStarRate;

        private int viewCount;

        private int commentCount;

        private recruitStatus status;

        private categoryStatus category;

        private String title;

        private LocalDateTime createdAt;

        private String image;

        private PostTagDto.Response postTag;
    }
}
