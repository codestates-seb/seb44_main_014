package com.bobfriends.bf.mate.mapper;

import com.bobfriends.bf.mate.dto.MateDto;
import com.bobfriends.bf.mate.entity.Mate;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingConstants;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING)
public interface MateMapper {

    @Mapping(target = "findNum", expression = "java(mate.getMateMembers().size())")
    MateDto.DetailResponse MateToMateDetailResponseDto(Mate mate);
}
