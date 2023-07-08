package com.bobfriends.bf.member.service;

import com.bobfriends.bf.member.entity.Member;
import com.bobfriends.bf.member.entity.MemberStarRate;
import com.bobfriends.bf.member.repository.MemberStarRateRepository;
import org.springframework.stereotype.Service;

@Service
public class MemberStarRateService {
    private final MemberStarRateRepository memberStarRateRepository;
    public MemberStarRateService(MemberStarRateRepository memberStarRateRepository){
        this.memberStarRateRepository=memberStarRateRepository;
    }
    public MemberStarRate createMemberStarRate(MemberStarRate memberStarRate){
        // URI로 입력받은 postId를 통해 해당 post의 memberId를 찾아 postmemberId에 넣어줌
        Member member = new Member();
        member.setMemberId(memberStarRate.getPost().getMember().getMemberId());
        memberStarRate.setPostMember(member);

        return memberStarRateRepository.save(memberStarRate);
    }
}
