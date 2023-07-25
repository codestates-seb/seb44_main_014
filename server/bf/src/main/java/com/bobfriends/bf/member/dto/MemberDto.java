package com.bobfriends.bf.member.dto;

import com.bobfriends.bf.comment.dto.CommentDto;
import com.bobfriends.bf.mate.dto.MateDto;
import com.bobfriends.bf.member.entity.Member;
import com.bobfriends.bf.post.dto.PostDto;
import lombok.*;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;
import java.time.LocalDateTime;
import java.util.List;

import static com.bobfriends.bf.post.entity.Post.*;

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

    @Getter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class Patch {

        private long memberId;
        private String image;
        private MemberTagDto.FoodTagMember foodTag;

        public void addMemberId(long memberId){
            this.memberId = memberId;
        }
    }

    @Getter @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class PatchResponse {
        private String image;
        private String name;
        private String email;
        private Member.genderStatus gender;
        private String location;
        private MemberTagDto.FoodTagResponse foodTag;
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
        private MemberTagDto.FoodTagMember foodTag;

        public void addMemberId(long memberId){
            this.memberId = memberId;
        }
    }

    /** 닉네임 중복 확인 **/
    @Getter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class CheckName {
        private String name;
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
        private MemberTagDto.Response memberTag;
    }


    /** 마이페이지 response **/
    @Getter @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    @Builder
    public static class Response {
        private String image;
        private String name;
        private Member.genderStatus gender;
        private String email;
        private float avgStarRate;
        private MemberTagDto.FoodTagResponse foodTag;
        private boolean eatStatus;
        private List<PostDto.myPageResponse> posts;
        private List<CommentDto.myPageResponse> comments;
        private List<MateDto.myPageResponse> postMates; // 자기가 연 모임
        private List<MateDto.myPageResponse> mates;  // 참여 중인 모임
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
        private long postId;
        private String title;
        private String content;
        private LocalDateTime createdAt;
        private recruitStatus status;
    }

    @Getter @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    public static class MemberCommentResponseDto {
        private long postId;
        private long commentId;
        private String content;
        private String title;
    }
}
