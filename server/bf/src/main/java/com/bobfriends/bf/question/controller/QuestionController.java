package com.bobfriends.bf.question.controller;

import com.bobfriends.bf.question.dto.QuestionDto;
import com.bobfriends.bf.question.entity.Question;
import com.bobfriends.bf.question.mapper.QuestionMapper;
import com.bobfriends.bf.question.service.QuestionService;
import com.bobfriends.bf.utils.UriCreator;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.constraints.Positive;
import java.net.URI;

@RestController
@Slf4j
@RequestMapping("/board")
public class QuestionController {

    public final static String QUESTION_DEFAULT_URL = "/board";

    public final QuestionService questionService;

    public final QuestionMapper questionMapper;

    public QuestionController(QuestionService questionService, QuestionMapper questionMapper) {
        this.questionService = questionService;
        this.questionMapper = questionMapper;
    }

    /** 질문 등록 **/
    @PostMapping("/questions")
    public ResponseEntity postQuestion(@RequestBody QuestionDto.Post post){

        Question question = questionService.createQuestion(questionMapper.QuestionPostToQuestion(post));

        URI location = UriCreator.createUri(QUESTION_DEFAULT_URL, question.getQuestionId());

        return ResponseEntity.created(location).build();
    }


    /** 질문 수정 **/
    @PatchMapping("/questions/{question-id}/edit")
    public ResponseEntity patchQuestion(@Positive @PathVariable("question-id") long questionId,
                                        @RequestBody QuestionDto.Patch patch){

        patch.addQuestionId(questionId);

        Question updateQuestion = questionService.updateQuestion(questionId, patch);

        return new ResponseEntity<>(questionMapper.QuestionToQuestionPatchResponseDto(updateQuestion), HttpStatus.OK);
    }



    /** 질문 삭제 **/
    @DeleteMapping("/questions/{question-id}")
    public ResponseEntity deleteQuestion(@Positive @PathVariable("question-id") long questionId){

        questionService.deleteQuestion(questionId);

        return ResponseEntity.noContent().build();
    }


}
