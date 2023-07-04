package com.bobfriends.bf.member.mapper;

import com.bobfriends.bf.member.dto.MemberTagDto;
import com.bobfriends.bf.member.entity.Member;
import com.bobfriends.bf.member.entity.MemberTag;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class MemberTagMapper {
    public static MemberTagDto mapToDto(Member member) {
        MemberTagDto memberTagDto = new MemberTagDto(member.getMemberTags());
        return memberTagDto;
    }

    public static List<MemberTagDto> mapToDtoList(List<MemberTag> memberTagList) {
        List<MemberTagDto> memberTagDtoList = new ArrayList<>();
        for (MemberTag memberTag : memberTagList) {
            MemberTagDto memberTagDto = mapToDto(memberTag.getMember());
            memberTagDtoList.add(memberTagDto);
        }
        return memberTagDtoList;
    }
}