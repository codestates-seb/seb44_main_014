package com.bobfriends.bf.question.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

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
}
