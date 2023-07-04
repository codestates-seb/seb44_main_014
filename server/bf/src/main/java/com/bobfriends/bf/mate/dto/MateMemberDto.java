package com.bobfriends.bf.mate.dto;

import lombok.*;

public class MateMemberDto {

    @Getter @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class DetailResponse{

        private long mateMemberId;

        private String name;
    }
}
