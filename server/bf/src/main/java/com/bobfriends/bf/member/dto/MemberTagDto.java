package com.bobfriends.bf.member.dto;

import com.bobfriends.bf.member.entity.MemberTag;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class MemberTagDto {
    private List<MemberTag> memberTags;

    public MemberTagDto(List<MemberTag> memberTags) {
        this.memberTags = memberTags;
    }
}