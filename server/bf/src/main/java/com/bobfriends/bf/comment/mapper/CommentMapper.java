package com.bobfriends.bf.comment.mapper;

import com.bobfriends.bf.comment.dto.CommentDto;
import com.bobfriends.bf.comment.entity.Comment;
import com.bobfriends.bf.question.service.QuestionService;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingConstants;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING)
public interface CommentMapper {
    @Mapping(source="memberId",target = "member.memberId")
    @Mapping(source="questionId",target = "question.questionId")
    Comment commentPostToComment(CommentDto.Post post);
    Comment commentPatchToComment(CommentDto.Patch patch);

    CommentDto.Response commentToCommentResponse(Comment comment);
}
