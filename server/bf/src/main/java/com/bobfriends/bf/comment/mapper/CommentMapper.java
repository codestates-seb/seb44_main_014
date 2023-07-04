package com.bobfriends.bf.comment.mapper;

import com.bobfriends.bf.comment.dto.CommentDto;
import com.bobfriends.bf.comment.entity.Comment;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface CommentMapper {
    Comment commentPostToComment(CommentDto.Post post);
    Comment commentPatchToComment(CommentDto.Patch patch);
    CommentDto.Response commentToCommentResponse(Comment comment);
}
