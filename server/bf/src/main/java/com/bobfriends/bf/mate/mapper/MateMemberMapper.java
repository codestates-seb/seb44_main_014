package com.bobfriends.bf.mate.mapper;

import com.bobfriends.bf.mate.dto.MateMemberDto;
import com.bobfriends.bf.mate.entity.Mate;
import com.bobfriends.bf.mate.entity.MateMember;
import com.bobfriends.bf.mate.service.MateService;
import com.bobfriends.bf.member.entity.Member;
import com.bobfriends.bf.post.entity.Post;
import org.mapstruct.Mapper;
import org.mapstruct.MappingConstants;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING)
public interface MateMemberMapper {
    default MateMember MateMemberPostToMateMember(MateMemberDto.PostMateMember requestbody){
        MateMember mateMember = new MateMember();
        Post post1 = new Post();
        Member member = new Member();
        Mate mate = new Mate();

        post1.setPostId(requestbody.getPostId());
        member.setMemberId(requestbody.getMemberId());
        mate.setPost(post1);

        mateMember.setMate(mate);
        mateMember.setMember(member);

        return mateMember;
    }
    default MateMemberDto.MateMemberResponse MateMemberToMateMemberResponse(MateMember mateMember){
        MateMemberDto.MateMemberResponse response = new MateMemberDto.MateMemberResponse();


        response.setMateNum(mateMember.getMate().getMateNum());
        response.setFindNum((long) mateMember.getMate().getMateMembers().size()+1);

        return response;
    }

}