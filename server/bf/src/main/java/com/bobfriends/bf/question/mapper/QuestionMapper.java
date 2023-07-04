package com.bobfriends.bf.question.mapper;

import com.bobfriends.bf.mate.dto.MateDto;
import com.bobfriends.bf.mate.dto.MateMemberDto;
import com.bobfriends.bf.mate.entity.Mate;
import com.bobfriends.bf.member.entity.Member;
import com.bobfriends.bf.question.dto.QuestionDto;
import com.bobfriends.bf.question.dto.QuestionTagDto;
import com.bobfriends.bf.question.entity.Question;
import com.bobfriends.bf.question.entity.QuestionTag;
import com.bobfriends.bf.tag.entity.FoodTag;
import com.bobfriends.bf.tag.entity.GenderTag;
import org.mapstruct.*;

import java.util.List;
import java.util.stream.Collectors;

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


        // questionTag 생성
        QuestionTag questionTag = new QuestionTag();
        questionTag.setQuestion(question);

        GenderTag genderTag = new GenderTag();
        if(post.getGenderTag() != null){
            genderTag.setGenderTagId(post.getGenderTag().getGenderTagId());
        }else{
            // null이면 기본값 태그 3 입력
            genderTag.setGenderTagId(3L);
        }

        questionTag.setGenderTag(genderTag);

        // 만약 카테고리가 SHOPPING이면 null
        FoodTag foodTag = new FoodTag();
        if(post.getCategory() == Question.categoryStatus.SHOPPING){
            questionTag.setFoodTag(null);
        }else {
            if(post.getFoodTag() != null){
                foodTag.setFoodTagId(post.getFoodTag().getFoodTagId());
            }else {
                // null이면 기본값 태그 5 입력
                foodTag.setFoodTagId(5L);
            }
            questionTag.setFoodTag(foodTag);
        }


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


    /** 일단 다 받아서 사용 **/
    // TODO : memberResponse + comments 추가 해야함
    default QuestionDto.DetailResponse QuestionToQuestionDetailResponseDto(Question question) {

        QuestionDto.DetailResponse questionResponseDto =
                QuestionDto.DetailResponse.builder()
                .title(question.getTitle())
                .content(question.getContent())
                .image(question.getImage())
                .createdAt(question.getCreatedAt())
                .viewCount(question.getViewCount())
                .commentCount(question.getCommentCount())
                .location(question.getLocation())
                .status(question.getStatus())
                .category(question.getCategory())
                .build();

        /** QuestionTagDto.Response **/
        if(question.getQuestionTag() != null){

            QuestionTagDto.Response questionTagResponseDto =
                    QuestionTagToQuestionTagResponseDto(question.getQuestionTag());

            questionResponseDto.setQuestionTag(questionTagResponseDto);
        }

        /** MateDto.DetailResponse **/
        if (question.getMate() != null){

            MateDto.DetailResponse mateResponseDto =
                    MateDto.DetailResponse.builder()
                    .findNum(question.getMate().getMateMembers().size())
                    .mateNum(question.getMate().getMateNum())
                    .build();

            questionResponseDto.setMate(mateResponseDto);
        }

        /** List<MateMemberDto.DetailResponse> **/
        if (question.getMate().getMateMembers() != null){

            List<MateMemberDto.DetailResponse> mateMembersDto =
                    question.getMate().getMateMembers()
                    .stream()
                    .map(mateMember -> MateMemberDto.DetailResponse.builder()
                            .mateMemberId(mateMember.getMateMemberId())
                            .name(mateMember.getMember().getName())
                            .build())
                    .collect(Collectors.toList());

            questionResponseDto.setMateMembers(mateMembersDto);
        }


        return questionResponseDto;
    }

    @Mapping(source = "member.memberId", target = "memberId")
    @Mapping(source = "member.name", target = "name")
    @Mapping(source = "member.avgStarRate", target = "avgStarRate")
    QuestionDto.Response QuestionToQuestionResponseDto(Question question);

    List<QuestionDto.Response> QuestionsToQuestionResponseDtos(List<Question> questions);
}
