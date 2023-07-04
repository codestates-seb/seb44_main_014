package com.bobfriends.bf.comment.service;

import com.bobfriends.bf.comment.entity.Comment;
import com.bobfriends.bf.comment.repository.CommentRepository;
import com.bobfriends.bf.exception.BusinessLogicException;
import com.bobfriends.bf.exception.ExceptionCode;
import com.bobfriends.bf.question.service.QuestionService;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
public class CommentService {
    private final CommentRepository commentRepository;
    private final QuestionService questionService;

    public CommentService(CommentRepository commentRepository,QuestionService questionService){
        this.commentRepository = commentRepository;
        this.questionService = questionService;
    }
    public Comment createComment(Comment comment){
//        존재하는 질문인지 확인
        return commentRepository.save(comment);
        
    }
    public Comment updateComment(Comment comment){
//        존재하는 댓글인지 확인
        Comment findComment = findVerifiedComment(comment.getCommentId());

        Optional.ofNullable(comment.getContent())
                .ifPresent(content -> findComment.setContent(content));
        findComment.setModifiedAt(LocalDateTime.now());
        return commentRepository.save(findComment);
    }
//    private void verifyComment(Comment comment){
//
//    }
    private Comment findVerifiedComment(long commentId) {
        Optional<Comment> optionalAnswer = commentRepository.findById(commentId);
        Comment findComment =
            optionalAnswer.orElseThrow(() ->
                    new BusinessLogicException(ExceptionCode.COMMENT_NOT_FOUND));
        return findComment;
    }
}
