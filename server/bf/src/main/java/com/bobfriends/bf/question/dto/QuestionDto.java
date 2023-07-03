package com.bobfriends.bf.question.dto;

import com.bobfriends.bf.mate.dto.MateDto;
import com.bobfriends.bf.question.entity.Question;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Positive;
import java.util.List;

public class QuestionDto {

    @Getter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class Post {

        @Positive
        private long memberId;

        @NotBlank
        private Question.categoryStatus category;

        @NotBlank
        private String title;

        @NotBlank
        private String content;

        private String image;

        /** 태그 하나만 등록 가능 (선택)
         *  - default : 상관없음
         */
        private QuestionTagDto.GenderTagPost genderTag;

        /** 태그 하나만 등록 가능 (선택)
         *  - default : 기타
         */
        private QuestionTagDto.FoodTagPost foodTag;

        @NotBlank
        private MateDto.Post mate;

        @NotBlank
        private String location;
    }
}
