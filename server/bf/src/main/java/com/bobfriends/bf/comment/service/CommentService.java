package com.bobfriends.bf.comment.service;


import com.bobfriends.bf.auth.jwt.JwtTokenizer;
import com.bobfriends.bf.comment.dto.CommentDto;
import com.bobfriends.bf.comment.entity.Comment;
import com.bobfriends.bf.comment.repository.CommentRepository;
import com.bobfriends.bf.exception.BusinessLogicException;
import com.bobfriends.bf.exception.ExceptionCode;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Objects;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CommentService {
    private final CommentRepository commentRepository;
    private final JwtTokenizer jwtTokenizer;

    /*** 댓글 생성 **/

    public Comment createComment(Comment comment) {

        return commentRepository.save(comment);
    }

    /*** 댓글 수정 **/
    public Comment updateComment(Comment comment,CommentDto.Patch patch){

        Comment verifiedComment = findVerifiedComment(comment.getCommentId());

        // 댓글 작성자 본인인지 검증
        if(!Objects.equals(verifiedComment.getMember().getMemberId(), patch.getMemberId())){
            throw new BusinessLogicException(ExceptionCode.CANNOT_CHANGE_COMMENT);
        }

        Optional.ofNullable(comment.getContent())
                .ifPresent(verifiedComment::setContent);
        verifiedComment.setModifiedAt(LocalDateTime.now());

        return commentRepository.save(verifiedComment);
    }

    /*** 댓글 조회 **/
    
    public Comment findComment(Long commentId){

        return findVerifiedComment(commentId);
    }
    
    /*** 댓글 삭제 **/

    public void deleteComment(Long commentId,String token){

        Comment verifiedComment = findVerifiedComment(commentId);

        String base64EncodedSecretKey = jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey());

        long loginId = jwtTokenizer.getMemberIdFromToken(token, base64EncodedSecretKey);

        long writerMemberId = verifiedComment.getMember().getMemberId();

        if(loginId == writerMemberId){
            commentRepository.deleteById(commentId);
        }else {
            throw new RuntimeException("등록한 작성자가 아닙니다");
        }
    }

    private Comment findVerifiedComment(Long commentId) {
        Optional<Comment> optionalComment = commentRepository.findById(commentId);

        return optionalComment.orElseThrow(() ->
                new BusinessLogicException(ExceptionCode.COMMENT_NOT_FOUND));
    }
}
