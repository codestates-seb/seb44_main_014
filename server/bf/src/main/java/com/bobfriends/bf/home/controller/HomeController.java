package com.bobfriends.bf.home.controller;

import com.bobfriends.bf.home.service.HomeService;
import com.bobfriends.bf.question.entity.Question;
import com.bobfriends.bf.question.mapper.QuestionMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@Slf4j
@RequestMapping("/home")
@RequiredArgsConstructor
public class HomeController {

    private final HomeService homeService;
    private final QuestionMapper mapper;

    @GetMapping
    public ResponseEntity getQuestions(){
        List<Question> questions = homeService.findQuestions();

        return new ResponseEntity<>(mapper.QuestionsToQuestionResponseDtos(questions), HttpStatus.OK);
    }
}
