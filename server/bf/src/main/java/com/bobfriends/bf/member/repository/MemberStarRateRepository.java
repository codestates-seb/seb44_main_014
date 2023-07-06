package com.bobfriends.bf.member.repository;

import com.bobfriends.bf.member.entity.Member;
import com.bobfriends.bf.member.entity.MemberStarRate;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MemberStarRateRepository extends JpaRepository<MemberStarRate, Long> {
}
