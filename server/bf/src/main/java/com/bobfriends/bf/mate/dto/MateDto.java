package com.bobfriends.bf.mate.dto;

import lombok.*;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Positive;
import java.util.List;

public class MateDto {

    @Getter
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Post {

        @NotBlank
        private int mateNum;
    }

    @Getter @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    public static class PatchResponse {

        private int mateNum;
    }

    @Getter @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class DetailResponse {

        private int findNum;

        private int mateNum;
    }

    @Getter @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class myPageResponse {

        private long mateId;
        private long postId;
        private String title;
        private List<MateMemberDto.MateMemberGetResponse> mateMembers;
        private long postMemberId;
        private String postMemberName;
    }
}