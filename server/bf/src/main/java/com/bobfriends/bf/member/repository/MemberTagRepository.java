package com.bobfriends.bf.member.repository;

import com.bobfriends.bf.location.entity.Location;
import com.bobfriends.bf.member.entity.MemberTag;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface MemberTagRepository extends JpaRepository<MemberTag, Long> {

    @Query("SELECT m FROM MemberTag m WHERE m.member.id = :memberId")
    Optional<MemberTag> findByMemberId(@Param("memberId") Long memberId);

}
