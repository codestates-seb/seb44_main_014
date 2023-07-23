package com.bobfriends.bf.mate.mapper;

import com.bobfriends.bf.exception.BusinessLogicException;
import com.bobfriends.bf.exception.ExceptionCode;
import com.bobfriends.bf.mate.dto.MateDto;
import com.bobfriends.bf.mate.dto.MateMemberDto;
import com.bobfriends.bf.mate.entity.Mate;
import com.bobfriends.bf.post.mapper.PostMapper;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingConstants;
import org.mapstruct.factory.Mappers;

import java.util.List;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING)
public interface MateMapper {

    MateMemberMapper mateMemberMapper = Mappers.getMapper(MateMemberMapper.class);

    @Mapping(target = "findNum", expression = "java(mate.getMateMembers().size())")
    MateDto.DetailResponse MateToMateDetailResponseDto(Mate mate);

    default MateDto.myPageResponse MateToMateMyPageResponseDto(Mate mate){
        if (mate == null) throw new BusinessLogicException(ExceptionCode.MATE_NOT_FOUND);

            MateDto.myPageResponse myPageResponse =
                    MateDto.myPageResponse.builder()
                            .mateId(mate.getMateId())
                            .postId(mate.getPost().getPostId())
                            .title(mate.getPost().getTitle())
                            .postMemberId(mate.getPost().getMember().getMemberId())
                            .postMemberName(mate.getPost().getMember().getName())
                            .build();

        if(mate.getMateMembers() != null){
            List<MateMemberDto.MateMemberGetResponse> mateMemberGetResponses
                    = mateMemberMapper.MateMembersToMateMemberGetResponses(mate.getMateMembers());

            myPageResponse.setMateMembers(mateMemberGetResponses);
        }

        return myPageResponse;
    }

    List<MateDto.myPageResponse> MatesToMateMyPageResponseDtos(List<Mate> mates);
}
