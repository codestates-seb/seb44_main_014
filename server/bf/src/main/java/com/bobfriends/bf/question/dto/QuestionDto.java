package com.bobfriends.bf.question.dto;

import com.bobfriends.bf.mate.dto.MateDto;
import com.bobfriends.bf.question.entity.Question;
import lombok.*;

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


    @Getter
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Patch {

        @Positive
        private long questionId;

        @Positive
        private long memberId;

        private Question.categoryStatus category;

        private String title;

        private String content;

        private String image;

        private QuestionTagDto.GenderTagPost genderTag;

        private QuestionTagDto.FoodTagPost foodTag;

        private MateDto.Post mate;

        private String location;

        private Question.recruitStatus status;

        public void addQuestionId(long questionId){
            this.questionId = questionId;
        }
    }


    @Getter @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    @Builder
    public static class PatchResponse {

        @Positive
        private long questionId;

        @Positive
        private long memberId;

        private Question.categoryStatus category;

        private String title;

        private String content;

        private String image;

        private QuestionTagDto.Response questionTag;

        private MateDto.PatchResponse mate;

        private String location;

        private Question.recruitStatus status;
    }
}
