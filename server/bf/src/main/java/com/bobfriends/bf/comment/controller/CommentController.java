package com.bobfriends.bf.comment.controller;

import com.bobfriends.bf.comment.dto.CommentDto;
import com.bobfriends.bf.comment.entity.Comment;
import com.bobfriends.bf.comment.mapper.CommentMapper;
import com.bobfriends.bf.comment.service.CommentService;
import com.bobfriends.bf.dto.SingleResponseDto;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.util.List;

@RestController
@RequestMapping("/board/posts/{post-id}/comments")
@Validated
public class CommentController {
    private final static String COMMENT_DEFAULT_URL = "/board/posts/{post-id}/comments";
    private final CommentService commentService;
    private final CommentMapper commentMapper;

    public CommentController(CommentService commentService,CommentMapper commentMapper){
        this.commentService=commentService;
        this.commentMapper=commentMapper;
    }

    // member의 name과 avgStarRate가 response로 안 나오고 있음
    @PostMapping
    public ResponseEntity postComment(@Valid @RequestBody CommentDto.Post post,
                                      @PathVariable("post-id") @Positive long postId){
        post.addPostId(postId);

        Comment comment = commentMapper.CommentPostToComment(post);
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

    // pathvariable에 있는 postId와 response의 postId가 매칭이 안 되고 있음
    @PatchMapping("/{comment-id}")
    public ResponseEntity patchComment(@Valid @RequestBody CommentDto.Patch patch,
                                       @PathVariable("post-id")@Positive long postId,
                                       @PathVariable("comment-id")@Positive long commentId){
        patch.addPostId(postId);
        patch.addCommentId(commentId);
        Comment comment = commentMapper.CommentPatchToComment(patch);
        Comment response = commentService.updateComment(comment,patch);

        return new ResponseEntity<>(commentMapper.commentToCommentResponse(response), HttpStatus.OK);
    }

    @GetMapping("/{comment-id}")
    public ResponseEntity getComment(@PathVariable("post-id")@Positive long postId,
                                        @PathVariable("comment-id")@Positive long commentId){
        Comment response = commentService.findComment(commentId);
        return new ResponseEntity<>(new SingleResponseDto<>(commentMapper.commentToCommentResponse(response)),HttpStatus.OK);
    }

    @DeleteMapping("/{comment-id}")
    public ResponseEntity deleteComment(@PathVariable("post-id")@Positive long postId,
                                        @PathVariable("comment-id")@Positive long commentId){
        commentService.deleteComment(commentId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
