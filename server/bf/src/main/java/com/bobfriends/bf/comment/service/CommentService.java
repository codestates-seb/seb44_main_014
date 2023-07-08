package com.bobfriends.bf.comment.service;


import com.bobfriends.bf.comment.dto.CommentDto;

import com.bobfriends.bf.comment.entity.Comment;
import com.bobfriends.bf.comment.repository.CommentRepository;
import com.bobfriends.bf.exception.BusinessLogicException;
import com.bobfriends.bf.exception.ExceptionCode;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Objects;

import java.util.Optional;

@Service
public class CommentService {
    private final CommentRepository commentRepository;

    public CommentService(CommentRepository commentRepository){
        this.commentRepository = commentRepository;
    }

    public Comment createComment(Comment comment){

        return commentRepository.save(comment);
    }

    public Comment updateComment(Comment comment,CommentDto.Patch patch){
        // 존재하는 댓글인지 검증
        Comment findComment = findVerifiedComment(comment.getCommentId());

        // 댓글 작성자 본인인지 검증
        if(!Objects.equals(findComment.getMember().getMemberId(), patch.getMemberId())){
            throw new BusinessLogicException(ExceptionCode.CANNOT_CHANGE_COMMENT);
        }

        Optional.ofNullable(comment.getContent())
                .ifPresent(findComment::setContent);
        findComment.setModifiedAt(LocalDateTime.now());

        return commentRepository.save(findComment);
    }

    public Comment findComment(Long commentId){
        // 존재하는 댓글인지 검증 후 리턴
        return findVerifiedComment(commentId);
    }

    public void deleteComment(Long commentId){
        // 존재하는 댓글인지 검증
        findVerifiedComment(commentId);
        commentRepository.deleteById(commentId);
    }

    private Comment findVerifiedComment(Long commentId) {
        Optional<Comment> optionalComment = commentRepository.findById(commentId);

        return optionalComment.orElseThrow(() ->
                new BusinessLogicException(ExceptionCode.COMMENT_NOT_FOUND));

    }
}
