package com.taba7_2.recycling.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/ai")
public class AIController {

    private final WebClient webClient;

    public AIController(WebClient.Builder webClientBuilder) {
        this.webClient = webClientBuilder.baseUrl("http://localhost:5001").build();
    }

    @GetMapping("/results")
    public ResponseEntity<?> getAIResults() {
        try {
            // Flask AI 서버에서 JSON 결과 가져오기
            Map<String, List<Map<String, Object>>> response = webClient.get()
                    .uri("/results")
                    .retrieve()
                    .bodyToMono(Map.class)  // JSON을 Map 형식으로 변환
                    .block();

            // JSON 구조를 변환하여 이미지 경로 키를 제거하고 데이터 리스트만 반환
            List<Map<String, Object>> processedResults = response.values().stream().findFirst().orElse(null);

            return ResponseEntity.ok(processedResults);
        } catch (Exception e) {
            return ResponseEntity.status(500).body(Map.of("error", "AI 서버 데이터 가져오기 실패", "details", e.getMessage()));
        }
    }
}