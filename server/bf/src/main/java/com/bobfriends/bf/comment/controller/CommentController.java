package com.bobfriends.bf.comment.controller;

import com.bobfriends.bf.comment.dto.CommentDto;
import com.bobfriends.bf.comment.entity.Comment;
import com.bobfriends.bf.comment.mapper.CommentMapper;
import com.bobfriends.bf.comment.service.CommentService;
import com.bobfriends.bf.utils.UriCreator;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.net.URI;

@RestController
@RequestMapping("/board/questions/{question-id}/comments")
@Validated
public class CommentController {
    private final static String COMMENT_DEFAULT_URL = "/board/questions/{question-id}/comments";
    private final CommentService commentService;
    private final CommentMapper commentMapper;

    public CommentController(CommentService commentService,CommentMapper commentMapper){
        this.commentService=commentService;
        this.commentMapper=commentMapper;
    }

    @PostMapping
    public ResponseEntity postComment(@Valid @RequestBody CommentDto.Post post,
                                      @PathVariable("question-id") @Positive long questionId){
        post.setQuestionId(questionId);
        Comment comment = commentMapper.commentPostToComment(post);
        Comment createdComment = commentService.createComment(comment);
        return new ResponseEntity<>(commentMapper.commentToCommentResponse(createdComment), HttpStatus.CREATED);

//        URI location = UriCreator.createUri(COMMENT_DEFAULT_URL, createdComment.getCommentId());
//        URI location = UriComponentsBuilder
//                .newInstance()
//                .path(COMMENT_DEFAULT_URL)
//                .buildAndExpand(questionId)
//                .toUri();
//
//        return ResponseEntity.created(location).build();
    }
    @PatchMapping("/{comment-id}")
    public ResponseEntity patchComment(@Valid @RequestBody CommentDto.Patch patch,
                                       @PathVariable("question-id")@Positive long questionId,
                                       @PathVariable("comment-id")@Positive long commentId){
        patch.setQuestionId(questionId);
        patch.setCommentId(commentId);
        Comment comment = commentMapper.commentPatchToComment(patch);
        Comment response = commentService.updateComment(comment);

        return new ResponseEntity<>(commentMapper.commentToCommentResponse(response), HttpStatus.OK);
    }
}
