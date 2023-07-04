package com.bobfriends.bf.member.dto;

import com.bobfriends.bf.member.entity.Member;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class LoginResponseDto {
    private long memberId;
    private String name;
    private String email;
    private String location;
    private Member.genderStatus gender;

}
