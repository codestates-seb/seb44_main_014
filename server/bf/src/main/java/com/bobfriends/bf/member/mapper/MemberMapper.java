package com.bobfriends.bf.member.mapper;

import com.bobfriends.bf.member.dto.MemberDto;
import com.bobfriends.bf.member.entity.Member;
import org.mapstruct.Mapper;
import org.mapstruct.MappingConstants;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING)
public interface MemberMapper {

    default Member memberPostDtoToMember(MemberDto.Post requestBody) {
        if (requestBody == null) {
            return null;
        }

        Member member = new Member();

        member.setName(requestBody.getName());
        member.setEmail(requestBody.getEmail());
        member.setPassword(requestBody.getPassword());

        return member;
    }

    default Member memberPatchDtoToMember(MemberDto.Patch requestBody) {
        if (requestBody == null) {
            return null;
        }

        Member member = new Member();

        member.setName(requestBody.getName());
        member.setMemberId(requestBody.getMemberId());
        member.setPassword(requestBody.getPassword());
        member.setLocation(requestBody.getLocation());

        return member;
    }

    default MemberDto.Response memberTomemberResponseDtos(Member member) {
        boolean eatStatus = member.isEatStatus();
        MemberDto.Response response = new MemberDto.Response(
                member.getMemberId(),
                member.getEmail(),
                member.getImage(),
                member.getLocation(),
                member.getGender(),
                member.getName(),
                member.isEatStatus());

        return response;
    }
}