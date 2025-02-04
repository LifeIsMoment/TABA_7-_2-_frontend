package com.taba7_2.recycling.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api")
public class UserController {

    @GetMapping("/user")
    public Map<String, Object> getUserInfo() {
        return Map.of(
                "name", "홍길동",
                "points", 1200,
                "contribution", 15.5
        );
    }
}