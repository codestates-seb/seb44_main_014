package com.bobfriends.bf.member.mapper;

import com.bobfriends.bf.comment.dto.CommentDto;
import com.bobfriends.bf.member.dto.MemberStarRateDto;
import com.bobfriends.bf.member.entity.Member;
import com.bobfriends.bf.member.entity.MemberStarRate;
import com.bobfriends.bf.post.entity.Post;
import com.bobfriends.bf.post.service.PostService;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingConstants;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING)
public interface MemberStarRateMapper {
        default MemberStarRate MemberStarRatePostToMemberStarRate(MemberStarRateDto.Post requestbody){
            MemberStarRate memberStarRate = new MemberStarRate();
            Member member1 = new Member();
            Post post1 = new Post();

            member1.setMemberId(requestbody.getRateMemberId());
            post1.setPostId(requestbody.getPostId());

            memberStarRate.setRateMember(member1);
            memberStarRate.setPost(post1);
            memberStarRate.setStarRate(requestbody.getStarRate());

            return memberStarRate;
        }
        default  MemberStarRateDto.Response MemberStarRateToMemberStarRateResponse(MemberStarRate memberStarRate){
            MemberStarRateDto.Response response = new MemberStarRateDto.Response();

            response.setMemberStarRateId(memberStarRate.getMemberStarRateId());
            response.setPostMemberId(memberStarRate.getPostMember().getMemberId());
            response.setRateMemberId(memberStarRate.getRateMember().getMemberId());
            response.setStarRate(memberStarRate.getStarRate());

            return response;
        }
}
