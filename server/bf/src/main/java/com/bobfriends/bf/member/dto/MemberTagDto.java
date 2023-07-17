package com.bobfriends.bf.member.dto;

import lombok.*;

import javax.validation.constraints.Positive;

public class MemberTagDto {

    @Getter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class FoodTagMember {

        @Positive
        private long foodTagId;
    }

    @Getter @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    @Builder
    public static class Response {

        private long memberTagId;

        private long foodTagId;
    }

    @Getter @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    @Builder
    public static class FoodTagResponse {

        private long foodTagId;
    }
}