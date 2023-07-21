package com.bobfriends.bf.member.service;

import com.bobfriends.bf.member.entity.Member;
import com.bobfriends.bf.member.entity.MemberStarRate;
import com.bobfriends.bf.member.repository.MemberStarRateRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
@RequiredArgsConstructor
public class MemberStarRateService {
    private final MemberStarRateRepository memberStarRateRepository;
    private final MemberService memberService;


    @Transactional
    public MemberStarRate createMemberStarRate(MemberStarRate memberStarRate){
        // URI로 입력받은 postId를 통해 해당 post의 memberId를 찾아 postmemberId에 넣어줌
        Member member = new Member();
        member.setMemberId(memberStarRate.getPost().getMember().getMemberId());
        memberStarRate.setPostMember(member);

        MemberStarRate starRate = memberStarRateRepository.save(memberStarRate);

        Member rateMember = memberService.findVerifiedMember(starRate.getRateMember().getMemberId());

        float avgStarRate = rateMember.calculateAvgStarRate();
        rateMember.setAvgStarRate(avgStarRate);

        return starRate;
    }
}
