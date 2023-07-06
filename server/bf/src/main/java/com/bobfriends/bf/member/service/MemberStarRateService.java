package com.bobfriends.bf.member.service;

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
        return memberStarRateRepository.save(memberStarRate);
    }
}
