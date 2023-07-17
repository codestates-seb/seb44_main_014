package com.bobfriends.bf.location.controller;

import com.bobfriends.bf.comment.dto.CommentDto;
import com.bobfriends.bf.location.dto.LocationDto;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;
import javax.validation.constraints.Positive;

@RestController
public class LocationController {
    /* Todo : 1. [위치 저장 기능]
                 위도, 경도를 받아서 member에 저장

       Todo : 2. [위치 계산 기능]
                 memberId를 받아서 계산
                 post를 불러올 떄 해당 member의 위치를 기준으로 반경 2km이내에 있는 member를 계산하여 해당 post를 return해줌

       Todo :  if) 2km 이내에 2명의 member가 없을 경우 (or초기 등록하는 경우) -> 게시글 전체 뿌리기


       Todo : location 테이블(memberId랑 일대일)에 locationId, memberId, 위도, 경도
               1. 함수 ST_DISTANCE_SPHERE를 쓸 때 위도, 경도를 point 안에 넣음
               2. 함수에 반경 2km이내에 있는 memberId를 구하는 쿼리를 씀
               memberId가 구해지면 Service에서 postId를 구해서 List로 return해줌
     */
    // Todo : 위도, 경도를 pointdto 안에 넣고 point를 locationDto 안에 넣기??
    // Todo :
    /** 위치 저장 **/
    @PostMapping("location/create")
    public ResponseEntity postComment(@RequestBody LocationDto.Post){

    }
}
