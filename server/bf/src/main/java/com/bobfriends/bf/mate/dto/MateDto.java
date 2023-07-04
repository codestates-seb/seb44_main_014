package com.bobfriends.bf.mate.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

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
}
