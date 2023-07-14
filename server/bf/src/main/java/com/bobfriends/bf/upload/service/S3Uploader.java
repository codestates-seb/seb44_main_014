package com.bobfriends.bf.upload.service;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.PutObjectRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.Optional;
import java.util.UUID;


@Slf4j
@RequiredArgsConstructor
@Component
public class S3Uploader {

    private final AmazonS3 amazonS3Client;

    @Value("${cloud.aws.s3.bucket}")
    private String bucket;


    public String[] uploadPost(MultipartFile file) throws IOException {
        return new String[]{uploadFiles(file, "post"), bucket};
    }

    /** MultipartFile을 전달받아 File로 전환한 후 S3에 업로드 **/

    public String uploadFiles(MultipartFile multipartFile, String dirName) throws IOException {

        File uploadFile = convert(multipartFile)
                .orElseThrow(() -> new IllegalArgumentException("MultipartFile -> File 전환 실패"));
        return upload(uploadFile, dirName);
    }




    private String upload(File uploadFile, String dirName) {
        String fileName = dirName + "/" + UUID.randomUUID() + "." + uploadFile.getName();

        String uploadImageUrl = putS3(uploadFile, fileName);

        // 로컬에 생성된 File 삭제 (MultipartFile -> File 전환 하며 로컬에 파일 생성됨)
        removeNewFile(uploadFile);

        // 업로드된 파일의 S3 URL 주소 반환
        return uploadImageUrl;
    }



    /** S3 버킷에 이미지 업로드 **/

    private String putS3(File uploadFile, String fileName) {

        amazonS3Client.putObject(
                new PutObjectRequest(bucket, fileName, uploadFile)
                        // PublicRead 권한으로 업로드됨
                        .withCannedAcl(CannedAccessControlList.PublicRead)
        );

        return amazonS3Client.getUrl(bucket, fileName).toString();
    }



    /** 로컬에 있는 이미지 삭제 **/
    private void removeNewFile(File targetFile) {

        if(targetFile.delete()) {
            log.info("파일이 삭제되었습니다");
        } else {
            log.info("파일이 삭제되지 못했습니다");
        }
    }

    /** MultipartFile -> File 변환 **/
    private Optional<File> convert (MultipartFile file) throws IOException {

        // 작업 디렉토리 경로/파일 원본 이름
        // System.getProperty("user.dir") + "/" +
        File convertFile = new File(file.getOriginalFilename());

        // 파일이 존재하지 않는 경우 새로운 파일을 생성
        if(convertFile.createNewFile()) {
            try (FileOutputStream fos = new FileOutputStream(convertFile)){
                fos.write(file.getBytes());
            }
            return Optional.of(convertFile);
        }
        return Optional.empty();
    }
}
