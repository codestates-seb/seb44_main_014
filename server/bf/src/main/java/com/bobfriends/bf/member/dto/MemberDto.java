package com.bobfriends.bf.member.dto;

import com.bobfriends.bf.member.entity.Member;
import lombok.*;
import org.springframework.util.Assert;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;
import java.time.LocalDateTime;

public class MemberDto {
    @Getter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class Post {

        @Email
        @NotBlank
        @Pattern(regexp = "^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+$",
                message = "올바른 이메일 구성이 아닙니다.")
        private String email;

        @NotBlank
        @Size(min = 8, message = "비밀번호는 특수문자 포함 8자 이상이어야합니다.")
        private String password;

        @NotBlank
        @Size(min = 8, message = "비밀번호 확인이 비밀번호와 일치하지 않습니다")
        private String samePassword;
    }

    @Getter @Setter
    @AllArgsConstructor
    public static class Patch {

        private long memberId;

        private String name;

        @Size(min = 8, message = "비밀번호는 특수문자 포함 8자 이상이어야합니다.")
        private String password;

        private String location;

        private String image;

        private boolean eatStatus;

        private MemberTagDto.FoodTagMember foodTag;

        public Patch addMemberId(Long memberId) {
            Assert.notNull(memberId, "member id must not be null.");
            this.memberId = memberId;

            return this;
        }
    }

    @Getter @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class PatchResponse {
        private long memberId;
        private String image;
        private String name;
        private String password;
        private String location;
        private MemberTagDto.Response memberTag;
    }

    /** 최초 등록 **/
    @Getter @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class PatchInfo {
        private long memberId;
        private String name;
        private String image;
        private Member.genderStatus gender;
        private String location;
        private MemberTagDto.FoodTagMember foodTag;

        public void addMemberId(long memberId){
            this.memberId = memberId;
        }
    }

    /** 최초 등록 response **/
    @Getter @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class PatchInfoResponse {
        private long memberId;
        private String image;
        private String email;
        private String name;
        private Member.genderStatus gender;
        private String location;
        private MemberTagDto.Response memberTag;
    }

    @Getter @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class Response {
        private long memberId;
        private String image;
        private String name;
        private String email;
        private Member.genderStatus gender;
        private String location;
        private boolean eatStatus;
        private float avgStarRate;
        private MemberTagDto.Response memberTag;
    }


    @Getter @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    public static class DetailResponse {

        private long memberId;
        private String image;
        private String name;
        private Member.genderStatus gender;
        private float avgStarRate;
        private boolean eatStatus;
    }

    @Getter @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    public static class MemberPostResponseDto {
        private long memberId;
        private long postId;
        private String title;
        private String content;
        private LocalDateTime createdAt;
        private com.bobfriends.bf.post.entity.Post.recruitStatus status;
    }

    @Getter @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    public static class MemberCommentResponseDto {
        private long memberId;
        private long commentId;
        private String content;
        private String postTitle;
    }
}
