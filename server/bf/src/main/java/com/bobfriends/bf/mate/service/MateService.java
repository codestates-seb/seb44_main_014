package com.bobfriends.bf.mate.service;

import com.bobfriends.bf.exception.BusinessLogicException;
import com.bobfriends.bf.exception.ExceptionCode;
import com.bobfriends.bf.mate.dto.MateDto;
import com.bobfriends.bf.mate.entity.Mate;
import com.bobfriends.bf.mate.entity.MateMember;
import com.bobfriends.bf.mate.repository.MateRepository;
import com.bobfriends.bf.member.entity.Member;
import com.bobfriends.bf.member.service.MemberService;
import com.bobfriends.bf.post.entity.Post;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

import static com.bobfriends.bf.post.entity.Post.recruitStatus.COMPLETE;

@Service
@Slf4j
@Transactional
@RequiredArgsConstructor
public class MateService {

    private final MateRepository mateRepository;

    /** Mate update **/
    public void updateMate(Post post, MateDto.Post matePost){

        Mate findMate = findVerifiedMate(post.getMate().getMateId());
        findMate.setMateNum(matePost.getMateNum());
    }

    /** Mate가 존재하는지 확인 **/
    public Mate findVerifiedMate(long mateId){

        Optional<Mate> optionalMate = mateRepository.findById(mateId);

        Mate mate = optionalMate.orElseThrow(() ->
                new BusinessLogicException(ExceptionCode.MATE_NOT_FOUND));

        return mate;
    }
}