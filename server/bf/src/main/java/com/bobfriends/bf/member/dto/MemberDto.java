package com.bobfriends.bf.member.dto;

import com.bobfriends.bf.mate.dto.MateMemberDto;
import com.bobfriends.bf.member.entity.Member;
import com.bobfriends.bf.member.entity.MemberTag;
import lombok.*;
import org.springframework.util.Assert;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;
import java.util.List;

public class MemberDto {
    @Getter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class Post {

        @NotBlank
        private String name;

        @Email
        @NotBlank
        @Pattern(regexp = "^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+$",
                message = "올바른 이메일 구성이 아닙니다.")
        private String email;

        @NotBlank
        @Size(min = 8, message = "비밀번호는 특수문자 포함 8자 이상이어야합니다.")
        private String password;

    }

    @Getter
    @AllArgsConstructor
    public static class Patch {

        private long memberId;

        private String name;

        @Size(min = 8, message = "비밀번호는 특수문자 포함 8자 이상이어야합니다.")
        private String password;

        private String location;

        private boolean eatStatus;

        public Patch addMemberId(Long memberId) {
            Assert.notNull(memberId, "member id must not be null.");
            this.memberId = memberId;

            return this;
        }
    }

    @Getter
    public static class Response {
        private long memberId;
        private String image;
        private String name;
        private String email;
        private Member.genderStatus gender;
        private String location;
        private boolean eatStatus;
        private float avgStarRate;
        private List<MemberTag> memberTagList;

        public Response(long memberId, String image, String name, String email,
                        Member.genderStatus gender, String location,
                        boolean eatStatus, float avgStarRate) {
            this.memberId = memberId;
            this.image = image;
            this.name = name;
            this.email = email;
            this.gender = gender;
            this.location = location;
            this.eatStatus = eatStatus;
            this.avgStarRate = avgStarRate;
        }

        public void updateMemberTagList(List<MemberTag> memberTagList) {
            this.memberTagList = memberTagList;
        }
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
}
