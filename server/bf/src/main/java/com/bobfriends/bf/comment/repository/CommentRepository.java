package com.bobfriends.bf.comment.repository;

import com.bobfriends.bf.comment.entity.Comment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CommentRepository extends JpaRepository<Comment, Long> {
}
