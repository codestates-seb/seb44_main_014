package com.bobfriends.bf.member.mapper;

import com.bobfriends.bf.member.dto.MemberStarRateDto;
import com.bobfriends.bf.member.entity.MemberStarRate;
import org.mapstruct.Mapper;
import org.mapstruct.MappingConstants;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING)
public interface MemberStarRateMapper {
    MemberStarRate MemberStarRatePostToMemberStarRate(MemberStarRateDto.Post post);
    MemberStarRateDto.Response memberStarRateToMemberStarRateResponse(MemberStarRate memberStarRate);
}
