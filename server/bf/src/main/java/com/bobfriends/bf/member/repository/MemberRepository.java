package com.bobfriends.bf.member.repository;

import com.bobfriends.bf.member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface MemberRepository extends JpaRepository<Member, Long> {
    Optional<Member> findByEmail(String email);

    @Query("SELECT COUNT(m) > 0 FROM Member m WHERE m.name = :name")
    boolean existsByName(@Param("name") String name);

}
