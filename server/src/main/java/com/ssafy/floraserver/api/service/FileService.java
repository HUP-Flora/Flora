package com.ssafy.floraserver.api.service;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.ssafy.floraserver.api.vo.FileVO;
import com.ssafy.floraserver.common.exception.CustomException;
import com.ssafy.floraserver.common.exception.ErrorCode;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;
import java.util.UUID;

@Service
@Slf4j
@Transactional
@RequiredArgsConstructor
public class FileService {

    @Value("${cloud.aws.s3.bucket}")
    private String bucket;

    private final AmazonS3 amazonS3;

    public FileVO uploadFile(MultipartFile file) {
        log.info(String.valueOf(file.getSize()));
        FileVO fileVO = null;
        try{
            String originalName = file.getOriginalFilename();
            String extension = originalName.substring(originalName.lastIndexOf("."));
            String savedName = UUID.randomUUID() + "-" + originalName;

            ObjectMetadata objMeta = new ObjectMetadata();
            objMeta.setContentLength(file.getSize());
            objMeta.setContentType(file.getContentType());

            amazonS3.putObject(bucket, savedName, file.getInputStream(), objMeta);

//            File target = new File(filePath + savedName);
//            file.transferTo(target);

            fileVO = FileVO.builder()
                    .imgOriginalName(originalName)
                    .imgNewName(savedName)
                    .imgPath(amazonS3.getUrl(bucket, savedName).toString())
                    .imgUploadTime(LocalDateTime.now()).build();

            log.info(fileVO.toString());
        }catch (Exception e){
            throw new CustomException(ErrorCode.FILE_UPLOAD_FAIL);
        }
        return fileVO;
    }
}
