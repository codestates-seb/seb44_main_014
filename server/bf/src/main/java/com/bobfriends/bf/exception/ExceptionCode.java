package com.bobfriends.bf.exception;

import lombok.Getter;

public enum ExceptionCode {
    MEMBER_NOT_FOUND(404, "Member not found"),
    MEMBER_EXISTS(409, "Member exists"),

    FOOD_TAG_NOT_FOUND(404, "FoodTag not found"),
    GENDER_TAG_NOT_FOUND(404, "GenderTag not found"),

    POST_NOT_FOUND(404, "Post not found"),
    CANNOT_CHANGE_POST(403, "Post can not change"),

    COMMENT_NOT_FOUND(404, "Comment not found"),
    CANNOT_CHANGE_COMMENT(403, "Comment can not change"),

    MATE_NOT_FOUND(404,"Mate not found"),

    CANNOT_CREATE_MATE_MEMBER(403, "MateMember can not create"),
    CANNOT_CREATE_SAME_MATE_MEMBER(409, "Same MateMember can not create"),
    GENDER_DIFFERENT(403, "Not the corresponding gender"),

    PASSWORD_NOT_SAME(403, "Password not same"),
    REFRESH_TOKEN_NOT_SAME(401, "Refresh token not same"),

    CANNOT_CHANGE_LOCATION(403, "Location can not change"),
    LOCATION_NOT_FOUND(403, "Location not registered Member");
    @Getter
    private int status;

    @Getter
    private String message;

    ExceptionCode(int code, String message) {
        this.status = code;
        this.message = message;
    }
}