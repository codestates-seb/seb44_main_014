package com.bobfriends.bf.comment.mapper;

import com.bobfriends.bf.comment.dto.CommentDto;
import com.bobfriends.bf.comment.entity.Comment;
import com.bobfriends.bf.question.service.QuestionService;
import org.mapstruct.Mapper;
import org.mapstruct.MappingConstants;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING)
public interface CommentMapper {
    default Comment commentPostToComment(long questionId, QuestionService questionService, CommentDto.Post requestBody){
        Comment comment = new Comment();
        comment.setContent(requestBody.getContent());
        comment.setQuestion(questionService.findVerifiedQuestion(questionId));
        return comment;
    }
    Comment commentPostToComment(CommentDto.Post post);
    Comment commentPatchToComment(CommentDto.Patch patch);
    CommentDto.Response commentToCommentResponse(Comment comment);
}
