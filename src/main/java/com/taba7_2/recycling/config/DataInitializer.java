package com.taba7_2.recycling.config;

import com.taba7_2.recycling.model.User;
import com.taba7_2.recycling.repository.UserRepository;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@RequiredArgsConstructor
public class DataInitializer {

    private final UserRepository userRepository;

    @PostConstruct
    public void init() {
        if (userRepository.count() == 0) { // 기존 데이터가 없을 경우만 실행
            User user1;
            User user2;
            User user3;
            List<User> testUsers = List.of(
                    user1 = new User(1L, "test1", "1", "test1@example.com", 500),
                    user2 = new User(2L, "test2", "2", "test2@example.com", 1600),
                    user3 = new User(3L, "test3", "3", "test3@example.com", 2800)
            );
            userRepository.saveAll(testUsers);
            System.out.println("✅ 테스트 데이터가 성공적으로 추가되었습니다.");
        }
    }
}