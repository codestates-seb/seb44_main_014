package com.bobfriends.bf.upload.controller;

import com.bobfriends.bf.upload.service.S3Uploader;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequiredArgsConstructor
public class S3Controller {

    private final S3Uploader s3Uploader;

    /** 게시물 이미지 등록 **/
    @PostMapping("/post/images/upload")
    public ResponseEntity<String[]> postImage(@RequestPart MultipartFile multipartFile) throws IOException {

        return new ResponseEntity<>(s3Uploader.uploadPost(multipartFile), null, HttpStatus.OK);
    }

    @PostMapping("/users/images/upload")
    public ResponseEntity<String[]> memberImage(@RequestPart MultipartFile multipartFile) throws IOException {

        return new ResponseEntity<>(s3Uploader.uploadMember(multipartFile), null, HttpStatus.OK);
    }

}
