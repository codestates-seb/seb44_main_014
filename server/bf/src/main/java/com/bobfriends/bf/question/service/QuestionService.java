package com.bobfriends.bf.question.service;

import com.bobfriends.bf.exception.BusinessLogicException;
import com.bobfriends.bf.exception.ExceptionCode;
import com.bobfriends.bf.question.entity.Question;
import com.bobfriends.bf.question.repository.QuestionRepository;
import com.bobfriends.bf.tag.repository.FoodRepository;
import com.bobfriends.bf.tag.repository.GenderRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@Slf4j
@Transactional
@RequiredArgsConstructor
public class QuestionService {

    private final QuestionRepository questionRepository;

    private final FoodRepository foodRepository;

    private final GenderRepository genderRepository;

    /**
     * 질문 등록
     * - 성별 태그 / 음식 태그 선택 (default : 상관없음(3), 기타(5))
     * - 등록 기본 status : 모집중
     * TODO : 이미지 , 위치
     */
    public Question createQuestion(Question question){

        // TODO : 회원이 존재하는 회원인지 조회

        verifyTag(question);
        return questionRepository.save(question);
    }

    /**
     * 질문 삭제
     * - 질문 관련 답글, 모임 등 삭제
     */
    public void deleteQuestion(long questionId){

        Question findQuestion = findVerifiedQuestion(questionId);

        // TODO : 로그인한 회원이 작성자인지 확인 (JWT)
        long writerMemberId = findQuestion.getMember().getMemberId();

        questionRepository.delete(findQuestion);
    }


    /** 등록된 태그가 존재하는지 확인 **/
    private void verifyTag(Question question){

        // 음식 태그가 존재하지 않으면
        if(foodRepository.findById(question.getQuestionTag().getFoodTag().getFoodTagId()) == null){
            throw new BusinessLogicException(ExceptionCode.FOODTAG_NOT_FOUND);
            // 성별 태그가 존재하지 않으면
        }else if(genderRepository.findById(question.getQuestionTag().getGenderTag().getGenderTagId()) == null){
            throw new BusinessLogicException(ExceptionCode.GENDERTAG_NOT_FOUND);
        }
    }

    /** 질문이 등록된 질문인지 확인 **/
    public Question findVerifiedQuestion(long questionId){

        Optional<Question> findQuestion = questionRepository.findById(questionId);

        Question question = findQuestion.orElseThrow(() ->
                new BusinessLogicException(ExceptionCode.QUESTION_NOT_FOUND));

        return question;
    }

}
