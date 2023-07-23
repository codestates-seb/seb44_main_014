package com.bobfriends.bf.location.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

public class LocationDto {
    @Getter
    @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class Post {
        private double latitude;
        private double longitude;
        private String address;
        private Long memberId;

        public void addMemberId(Long memberId){
            this.memberId = memberId;
        }
    }
    @Getter
    @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class Patch {
        private double latitude;
        private double longitude;
        private String address;
        private Long memberId;
        private Long locationId;

        public void addMemberId(Long memberId){
            this.memberId = memberId;
        }
        public void addLocationId(Long locationId){
            this.locationId = locationId;
        }
    }
    @Getter
    @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class Get {
        private Long memberId;
        public void addMemberId(Long memberId){
            this.memberId = memberId;
        }
    }
    @Getter
    @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class Response {
        private Long locationId;
        private Long memberId;
        private double latitude;
        private double longitude;
        private String address;
    }
}