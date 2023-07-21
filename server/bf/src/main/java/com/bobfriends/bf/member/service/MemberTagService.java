package com.bobfriends.bf.member.service;

import com.bobfriends.bf.member.dto.MemberTagDto;
import com.bobfriends.bf.member.entity.Member;
import com.bobfriends.bf.member.entity.MemberTag;
import com.bobfriends.bf.member.repository.MemberTagRepository;
import com.bobfriends.bf.tag.entity.FoodTag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
@Slf4j
@Transactional
@RequiredArgsConstructor
public class MemberTagService {

    private final MemberTagRepository memberTagRepository;

    public MemberTag updateMemberFoodTag(Member member, MemberTagDto.FoodTagMember requestBody) {

        // memberTag 삭제
        memberTagRepository.deleteById(member.getMemberTag().getMemberTagId());

        FoodTag foodTag = new FoodTag();
        foodTag.setFoodTagId(requestBody.getFoodTagId());

        MemberTag memberTag = new MemberTag();
        memberTag.setMember(member);
        memberTag.setFoodTag(foodTag);

        memberTagRepository.save(memberTag);

        return memberTag;
    }
}
