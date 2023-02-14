package com.ssafy.floraserver.api.controller;

import com.ssafy.floraserver.api.request.ReportReq;
import com.ssafy.floraserver.api.service.ReportService;
import com.ssafy.floraserver.common.util.SecurityUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/v1/reports")
public class ReportController {

    private final ReportService reportService;

    @PostMapping
    public ResponseEntity<?> createReport(@RequestBody ReportReq reportReq){
        Map<String, String> authInfo = SecurityUtil.getCurrentUser();
        reportService.createReport(reportReq, authInfo);

        return new ResponseEntity<>(HttpStatus.CREATED);
    }
}
