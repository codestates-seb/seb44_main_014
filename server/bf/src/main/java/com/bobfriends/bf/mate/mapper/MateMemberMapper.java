package com.bobfriends.bf.mate.mapper;

import com.bobfriends.bf.mate.dto.MateMemberDto;
import com.bobfriends.bf.mate.entity.Mate;
import com.bobfriends.bf.mate.entity.MateMember;
import com.bobfriends.bf.member.entity.Member;
import com.bobfriends.bf.post.entity.Post;
import org.mapstruct.Mapper;
import org.mapstruct.MappingConstants;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING)
public interface MateMemberMapper {
    default MateMember MateMemberPostToMateMember(MateMemberDto.PostMateMember requestbody) {
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

    default MateMemberDto.MateMemberResponse MateMemberToMateMemberResponse(MateMember mateMember) {
        MateMemberDto.MateMemberResponse response = new MateMemberDto.MateMemberResponse();

        response.setMateNum(mateMember.getMate().getMateNum());
        response.setFindNum((long) mateMember.getMate().getMateMembers().size() + 1);

        return response;
    }
    
    default MateMemberDto.MateMemberGetResponses MateMemberToMateMemberGetResponses(Post post, List<MateMember> mateMembers) {
        MateMemberDto.MateMemberGetResponses responses = new MateMemberDto.MateMemberGetResponses();
        List<MateMemberDto.MateMemberGetResponse> list = new ArrayList<>();

        for (MateMember mateMember : mateMembers) {
            MateMemberDto.MateMemberGetResponse response = new MateMemberDto.MateMemberGetResponse();

            response.setMemberId(mateMember.getMember().getMemberId());
            response.setName(mateMember.getMember().getName());

            list.add(response);
        }

        Collections.sort(list, (response1, response2) -> response1.getMemberId().compareTo(response2.getMemberId()));

        responses.setStatus(post.getStatus());
        responses.setMate_member(list);

        return responses;
    }
}
