package com.bobfriends.bf.post.dto;

import lombok.*;

import javax.validation.constraints.Positive;

public class PostTagDto {

    @Getter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class FoodTagPost {

        @Positive
        private long foodTagId;

    }

    @Getter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class GenderTagPost {

        @Positive
        private long genderTagId;
    }

    @Getter @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    @Builder
    public static class Response {

        private long postTagId;

        private long foodTagId;

        private long genderTagId;
    }
}
