package com.bobfriends.bf.mate.service;

import com.bobfriends.bf.exception.BusinessLogicException;
import com.bobfriends.bf.exception.ExceptionCode;
import com.bobfriends.bf.mate.dto.MateDto;
import com.bobfriends.bf.mate.entity.Mate;
import com.bobfriends.bf.mate.repository.MateRepository;
import com.bobfriends.bf.question.entity.Question;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@Slf4j
@Transactional
@RequiredArgsConstructor
public class MateService {

    private final MateRepository mateRepository;

    /** Mate update **/
    public void updateMate(Question question, MateDto.Post post){

        Mate findMate = findVerifiedQuestion(question.getMate().getMateId());
        findMate.setMateNum(post.getMateNum());
    }

    /** Mate가 존재하는지 확인 **/
    public Mate findVerifiedQuestion(long mateId){

        Optional<Mate> optionalMate = mateRepository.findById(mateId);

        Mate mate = optionalMate.orElseThrow(() ->
                new BusinessLogicException(ExceptionCode.MATE_NOT_FOUND));

        return mate;
    }
}
