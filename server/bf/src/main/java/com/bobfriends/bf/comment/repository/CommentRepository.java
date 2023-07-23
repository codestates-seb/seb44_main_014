package com.bobfriends.bf.comment.repository;

import com.bobfriends.bf.comment.entity.Comment;
import com.bobfriends.bf.post.entity.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface CommentRepository extends JpaRepository<Comment, Long> {

    @Query("SELECT c FROM Comment c WHERE c.member.id = :memberId")
    List<Comment> findAllByMemberId(@Param("memberId") Long memberId);
}
