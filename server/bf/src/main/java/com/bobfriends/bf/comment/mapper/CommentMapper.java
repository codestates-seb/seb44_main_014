package com.bobfriends.bf.comment.mapper;

import com.bobfriends.bf.comment.dto.CommentDto;
import com.bobfriends.bf.comment.entity.Comment;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingConstants;


@Mapper(componentModel = MappingConstants.ComponentModel.SPRING)
public interface CommentMapper {
    @Mapping(source="memberId",target = "member.memberId")
    @Mapping(source="postId",target = "post.postId")
    Comment CommentPostToComment(CommentDto.Post post);
    @Mapping(source="memberId",target = "member.memberId")
    @Mapping(source="postId",target = "post.postId")
    Comment CommentPatchToComment(CommentDto.Patch patch);
    @Mapping(source = "post.postId", target = "postId")
    @Mapping(source = "member.memberId", target = "memberId")
    @Mapping(source = "member.name", target = "name")
    @Mapping(source = "member.avgStarRate", target = "avgStarRate")
    CommentDto.Response commentToCommentResponse(Comment comment);

}
