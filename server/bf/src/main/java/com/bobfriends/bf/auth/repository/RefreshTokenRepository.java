package com.bobfriends.bf.auth.repository;

import com.bobfriends.bf.auth.entity.RefreshToken;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RefreshTokenRepository extends JpaRepository<RefreshToken, Long> {

    RefreshToken findRefreshTokenByMemberId(Long memberId);
}
