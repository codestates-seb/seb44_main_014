package com.bobfriends.bf.mate.repository;

import com.bobfriends.bf.mate.entity.MateMember;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MateMemberRepository extends JpaRepository<MateMember, Long> {
}
