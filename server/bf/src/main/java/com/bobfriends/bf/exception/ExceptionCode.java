package com.bobfriends.bf.exception;

import lombok.Getter;

public enum ExceptionCode {
    MEMBER_NOT_FOUND(404, "Member not found"),
    MEMBER_EXISTS(409, "Member exists"),
    COFFEE_NOT_FOUND(404, "Coffee not found"),
    COFFEE_CODE_EXISTS(409, "Coffee Code exists"),
    ORDER_NOT_FOUND(404, "Order not found"),
    CANNOT_CHANGE_ORDER(403, "Order can not change"),
    NOT_IMPLEMENTATION(501, "Not Implementation"),
    INVALID_MEMBER_STATUS(400, "Invalid member status"),
    FOODTAG_NOT_FOUND(404, "FoodTag not found"),
    GENDERTAG_NOT_FOUND(404, "GenderTag not found"),
    POST_NOT_FOUND(404, "Post not found"),
    MATE_NOT_FOUND(404,"Mate not found"),
    CANNOT_CHANGE_POST(403, "Post can not change"),
    COMMENT_NOT_FOUND(404, "Comment not found"),
    CANNOT_CHANGE_COMMENT(403, "Comment can not change"),
    CANNOT_CREATE_MATEMEMBER(403, "MateMember can not create"),
    CANNOT_CREATE_SAME_MATEMEMBER(403, "Same MateMember can not create");

    @Getter
    private int status;

    @Getter
    private String message;

    ExceptionCode(int code, String message) {
        this.status = code;
        this.message = message;
    }
}