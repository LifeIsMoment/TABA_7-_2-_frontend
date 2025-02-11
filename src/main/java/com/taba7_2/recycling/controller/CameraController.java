package com.taba7_2.recycling.controller;

import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/camera")
public class CameraController {

    private final SimpMessagingTemplate messagingTemplate;

    public CameraController(SimpMessagingTemplate messagingTemplate) {
        this.messagingTemplate = messagingTemplate;
    }

    @PostMapping("/start")
    public String activateCamera() {
        // WebSocket을 통해 Flutter 앱으로 메시지 전송
        messagingTemplate.convertAndSend("/topic/camera", "activate_camera");
        return "카메라 실행 신호 전송 완료";
    }
}