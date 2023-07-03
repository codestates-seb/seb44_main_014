package com.bobfriends.bf.member.dto;

import com.bobfriends.bf.member.entity.Member;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class LoginResponseDto {
    private String name;
    private String email;
    private String location;
    private Member.genderStatus gender;

}