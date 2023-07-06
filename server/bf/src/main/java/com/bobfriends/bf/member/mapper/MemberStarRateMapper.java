package com.bobfriends.bf.member.mapper;

import com.bobfriends.bf.comment.dto.CommentDto;
import com.bobfriends.bf.member.dto.MemberStarRateDto;
import com.bobfriends.bf.member.entity.Member;
import com.bobfriends.bf.member.entity.MemberStarRate;
import com.bobfriends.bf.post.entity.Post;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingConstants;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING)
public interface MemberStarRateMapper {
        /** memberStarRateId -> MemberStarRate 테이블의 primary key
         * postId -> 게시글에 속한 게시글 번호(URI로 입력받음) (post테이블)
         * postMemberId -> 회원에 속한 게시글 작성자 (member테이블)
         * rateMemberId ->메이트에 속한 회원(작성자 제외) (member 테이블)
         * starRate -> enum타입으로 회원을 평가하는 별점
         */

        /** request -> rateMemberId, starRate ,postId(URI로 받음)
         *  response -> memberStarRateId, postMemberId, rateMemberId, starRate
         */

        /** 1. rateMemberId와 starRate를 받으면 setter로 수정 후 response로 줘야함
         *  2.
         */
        default MemberStarRate MemberStarRatePostToMemberStarRate(MemberStarRateDto.Post post){
            MemberStarRate memberStarRate = new MemberStarRate();
            Member member = new Member();
            Post post1 = new Post();

            member.setMemberId(post.getRateMemberId());
            post1.setPostId(post.getPostId());

            memberStarRate.setRateMember(member);
            memberStarRate.setPost(post1);
            memberStarRate.setStarRate(post.getStarRate());

            return memberStarRate;
        }
    @Mapping(source = "postMember.memberId", target = "postMemberId")
    @Mapping(source = "rateMember.memberId", target = "rateMemberId")
    MemberStarRateDto.Response MemberStarRateToMemberStarRateResponse(MemberStarRate memberStarRate);
//        default  MemberStarRateDto.Response MemberStarRateToMemberStarRateResponse(MemberStarRate memberStarRate){
//            MemberStarRateDto.Response response = new MemberStarRateDto.Response();
//            response.
//        }
}
