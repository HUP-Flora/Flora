package com.ssafy.floraserver.api.controller;

import com.ssafy.floraserver.api.service.PayService;
import com.ssafy.floraserver.api.vo.PayReadyResVo;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;

@RestController
@Slf4j
@RequestMapping("/api/flowermarks")
@RequiredArgsConstructor
public class FlowermarksController {

    @PostMapping("/{uId}")
    public void flowerMarks(@PathVariable("oId") Long oId) {


    }

}
