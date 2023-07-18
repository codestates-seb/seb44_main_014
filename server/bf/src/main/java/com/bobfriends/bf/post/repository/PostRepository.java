package com.bobfriends.bf.post.repository;

import com.bobfriends.bf.post.entity.Post;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface PostRepository extends JpaRepository<Post, Long> , PostRepositoryCustom {

    /** 정렬 **/
    List<Post> findAll(Sort sort);

    @Query("SELECT p FROM Post p WHERE p.member.id = :memberId")
    List<Post> findAllByMemberId(@Param("memberId") Long memberId);

}
