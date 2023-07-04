package com.bobfriends.bf.question.mapper;

import com.bobfriends.bf.mate.dto.MateDto;
import com.bobfriends.bf.mate.entity.Mate;
import com.bobfriends.bf.member.entity.Member;
import com.bobfriends.bf.question.dto.QuestionDto;
import com.bobfriends.bf.question.dto.QuestionTagDto;
import com.bobfriends.bf.question.entity.Question;
import com.bobfriends.bf.question.entity.QuestionTag;
import com.bobfriends.bf.tag.entity.FoodTag;
import com.bobfriends.bf.tag.entity.GenderTag;
import org.mapstruct.*;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING)
public interface QuestionMapper {

    default Question QuestionPostToQuestion(QuestionDto.Post post){
        Question question = new Question();
        Member member = new Member();
        member.setMemberId(post.getMemberId());

        question.setCategory(post.getCategory());
        question.setTitle(post.getTitle());
        question.setContent(post.getContent());
        question.setImage(post.getImage());
        question.setLocation(post.getLocation());
        question.setStatus(Question.recruitStatus.RECRUITING);

        GenderTag genderTag = new GenderTag();
        if(post.getGenderTag() != null){
            genderTag.setGenderTagId(post.getGenderTag().getGenderTagId());
        }else{
            // null이면 기본값 태그 3 입력
            genderTag.setGenderTagId(3L);
        }

        FoodTag foodTag = new FoodTag();
        if(post.getFoodTag() != null){
            foodTag.setFoodTagId(post.getFoodTag().getFoodTagId());
        }else {
            // null이면 기본값 태그 5 입력
            foodTag.setFoodTagId(5L);
        }

        // questionTag 생성
        QuestionTag questionTag = new QuestionTag();
        questionTag.setQuestion(question);
        questionTag.setFoodTag(foodTag);
        questionTag.setGenderTag(genderTag);

        // Mate 생성
        Mate mate = new Mate();
        mate.setMateNum(post.getMate().getMateNum());
        mate.setQuestion(question);

        question.setMember(member);
        question.setQuestionTag(questionTag);
        question.setMate(mate);

        return question;
    }


    @Mapping(source = "member.memberId", target = "memberId")
    QuestionDto.PatchResponse QuestionToQuestionPatchResponseDto(Question question);

    @Mapping(source = "foodTag.foodTagId", target = "foodTagId")
    @Mapping(source = "genderTag.genderTagId", target = "genderTagId")
    QuestionTagDto.Response QuestionTagToQuestionTagResponseDto(QuestionTag questionTag);

    // TODO : Mate 쪽으로 옮기기
    MateDto.PatchResponse MateToMatePatchResponseDto(Mate mate);
}
