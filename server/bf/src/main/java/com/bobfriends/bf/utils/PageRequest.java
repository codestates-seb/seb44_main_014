package com.bobfriends.bf.utils;

import org.springframework.data.domain.Sort;

/** Custom PageRequest **/
public class PageRequest {

    private int page = 1;
    private final int size = 10; // 기본
    private final Sort.Direction direction = Sort.Direction.DESC; // 최신순

    public void setPage(int page){
        this.page = page <= 0 ? 1 : page;
    }

    public org.springframework.data.domain.PageRequest of() {
        return org.springframework.data.domain.PageRequest.of(page-1, size, direction, "createdAt");
    }
}
