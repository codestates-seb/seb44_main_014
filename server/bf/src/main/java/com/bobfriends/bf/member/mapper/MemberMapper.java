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

    default Member memberPatchToMember(MemberDto.Patch requestBody) {
        if (requestBody == null) {
            return null;
        }

        Member member = new Member();

        member.setName(requestBody.getName());
        member.setMemberId(requestBody.getMemberId());
        member.setPassword(requestBody.getPassword());

        return member;
    }

    default MemberDto.Response memberToMemberResponseDto(Member member) {

        boolean eatStatus = member.isEatStatus();

        String genderStatusString = member.getGender().getStatus();  // genderStatus 값을 String으로 가져옴
        Member.genderStatus gender = null;

        if (genderStatusString.equals(Member.genderStatus.FEMALE.getStatus())) {
            gender = Member.genderStatus.FEMALE;
        } else if (genderStatusString.equals(Member.genderStatus.MALE.getStatus())) {
            gender = Member.genderStatus.MALE;
        }

        MemberDto.Response response = new MemberDto.Response(
                member.getMemberId(),
                member.getImage(),
                member.getName(),
                member.getEmail(),
                gender,  // String 값을 genderStatus 타입으로 변환한 변수를 사용
                member.getLocation(),
                eatStatus,
                member.getAvgStarRate()

        );


        return response;
    }
}