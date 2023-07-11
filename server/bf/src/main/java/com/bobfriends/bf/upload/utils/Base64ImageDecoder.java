package com.bobfriends.bf.upload.utils;

import org.apache.commons.io.FileUtils;

import java.io.File;
import java.io.IOException;
import java.util.Base64;

public class Base64ImageDecoder {

    public static File decodeBase64Image(String base64Image) throws IOException {

        // 실제 이미지 데이터부분 추출
        String[] parts = base64Image.split(",");
        String base64Data = parts[1];

        // 디코딩라여 바이트 배열로 변환
        byte[] imageData = Base64.getDecoder().decode(base64Data);

        // 임시 파일 생성 (".jpg")
        File imageFile = File.createTempFile("image", ".jpg");
        FileUtils.writeByteArrayToFile(imageFile, imageData);

        return imageFile;
    }
}
