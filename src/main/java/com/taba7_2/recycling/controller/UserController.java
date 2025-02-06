package com.taba7_2.recycling.controller;

import com.taba7_2.recycling.model.User;
import com.taba7_2.recycling.repository.UserRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class UserController {
    private final UserRepository userRepository;

    public UserController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @GetMapping("/user")
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }
    @PostMapping("/user")
    public User createUser(@RequestBody User user) {
        return userRepository.save(user);
    }
//    public Map<String, Object> getUserInfo() {
//        int points = 1200; // 현재 포인트 (임시 데이터)
//
//        // 🔹 10단계 환경 보호등급 설정
//        String[] grades = {
//                "환경테러범", "분리배출 초보", "분리배출 견습생", "분리배출 전문가",
//                "환경 보호 활동가", "환경 지킴이", "지속가능 챔피언", "에코 히어로",
//                "그린 리더", "환경 수호자"
//        };
//
//        // 🔹 등급 계산 로직 (각 등급의 최소 포인트 기준)
//        int[] gradeThresholds = {0, 500, 1000, 1500, 2000, 2500, 3000, 4000, 5000, 6000};
//
//        int gradeIndex = 0; // 기본 등급 (환경테러범)
//        for (int i = 0; i < gradeThresholds.length; i++) {
//            if (points >= gradeThresholds[i]) {
//                gradeIndex = i;
//            } else {
//                break;
//            }
//        }
//
//        String grade = grades[gradeIndex]; // 현재 등급
//        int nextThreshold = (gradeIndex + 1 < gradeThresholds.length) ? gradeThresholds[gradeIndex + 1] : -1;
//        int pointsToNextLevel = (nextThreshold > 0) ? (nextThreshold - points) : 0;
//
//        return Map.of(
//                "name", "홍길동",
//                "points", points,
//                "contribution", 15.5,
//                "grade", grade,
//                "nextLevelPoints", pointsToNextLevel // 🔹 승급까지 필요한 포인트 추가
//        );
//    }
}