package com.bobfriends.bf.question.service;

import com.bobfriends.bf.question.dto.QuestionTagDto;
import com.bobfriends.bf.question.entity.Question;
import com.bobfriends.bf.question.entity.QuestionTag;
import com.bobfriends.bf.question.repository.QuestionTagRepository;
import com.bobfriends.bf.tag.entity.FoodTag;
import com.bobfriends.bf.tag.entity.GenderTag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Slf4j
@Transactional
@RequiredArgsConstructor
public class QuestionTagService {

    private final QuestionTagRepository questionTagRepository;

    /** QuestionFoodTag update **/
    public QuestionTag updateQuestionFoodTag(Question question, QuestionTagDto.FoodTagPost post){

        GenderTag genderTag = new GenderTag();
        // 삭제 전 저장
        genderTag.setGenderTagId(question.getQuestionTag().getGenderTag().getGenderTagId());

        // questionTag 삭제
        questionTagRepository.deleteById(question.getQuestionTag().getQuestionTagId());

        FoodTag foodTag = new FoodTag();
        foodTag.setFoodTagId(post.getFoodTagId());

        // questionTag 다시 생성
        QuestionTag questionTag = new QuestionTag(question, foodTag, genderTag);
        questionTagRepository.save(questionTag);

        return questionTag;
    }


    /** QuestionGenderTag update **/
    public QuestionTag updateQuestionGenderTag(Question question, QuestionTagDto.GenderTagPost post){

        FoodTag foodTag = new FoodTag();
        // 삭제 전 저장
        foodTag.setFoodTagId(question.getQuestionTag().getFoodTag().getFoodTagId());

        // questionTag 삭제
        questionTagRepository.deleteById(question.getQuestionTag().getQuestionTagId());

        GenderTag genderTag = new GenderTag();
        genderTag.setGenderTagId(post.getGenderTagId());

        // questionTag 다시 생성
        QuestionTag questionTag = new QuestionTag(question, foodTag, genderTag);
        questionTagRepository.save(questionTag);

        return questionTag;
    }
}
