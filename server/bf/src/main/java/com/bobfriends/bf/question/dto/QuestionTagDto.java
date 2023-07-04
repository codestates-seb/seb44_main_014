package com.bobfriends.bf.question.dto;

import com.bobfriends.bf.tag.entity.FoodTag;
import com.bobfriends.bf.tag.entity.GenderTag;
import lombok.*;

import javax.validation.constraints.Positive;

public class QuestionTagDto {

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

        private long questionTagId;

        private long foodTagId;

        private long genderTagId;
    }
}
