package com.bobfriends.bf.mate.dto;

import lombok.*;

import javax.validation.constraints.NotBlank;

public class MateDto {

    @Getter
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Post {

        @NotBlank
        private int mateNum;
    }

    @Getter @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    public static class PatchResponse {

        private int mateNum;
    }


    @Getter @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class DetailResponse {

        private int findNum;

        private int mateNum;
    }
}
