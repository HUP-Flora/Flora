package com.ssafy.floraserver.api.service;

import com.ssafy.floraserver.api.vo.FileVO;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.time.LocalDateTime;
import java.util.UUID;

@Service
@Slf4j
@Transactional
@RequiredArgsConstructor
public class FileService {

    public FileVO uploadFile(String filePath, MultipartFile file) {
        log.info(String.valueOf(file.getSize()));
        FileVO fileVO = null;
        try{
            String originalName = file.getOriginalFilename();
            String extension = originalName.substring(originalName.lastIndexOf("."));
            String savedName = UUID.randomUUID() + extension;

            File target = new File(filePath + savedName);

            file.transferTo(target);

            fileVO = FileVO.builder()
                    .imgOriginalName(originalName)
                    .imgNewName(savedName)
                    .imgPath(String.valueOf(target))
                    .imgUploadTime(LocalDateTime.now()).build();

            log.info(fileVO.toString());
        }catch (Exception e){
            e.printStackTrace();
        }
        return fileVO;
    }
}
