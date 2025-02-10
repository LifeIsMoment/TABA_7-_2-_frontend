import { authService } from "@/lib/firebase/auth";
import { dbService } from "@/lib/firebase/db";  // dbService 경로 수정

async function testLogin() {
  const email = "testuser@example.com";
  const password = "password123";

  try {
    // 로그인
    const user = await authService.login(email, password);
    console.log("✅ 로그인 성공:", user.uid);
    // 사용자 정보 가져오기
    const userDoc = await dbService.users.get(user.uid);  // 사용자 정보
    const { location, apartment } = userDoc;

    console.log("📍 위치 정보:", location);
    console.log("🏢 아파트 정보:", apartment);
    // 세션 생성 (user_sessions 컬렉션에 저장)
    await dbService.user_sessions.create(user.uid, { location, apartment });
    console.log("🔑 세션 생성 완료!");
  } catch (error) {
    console.error("❌ 로그인 실패:", error);
  }
}

testLogin();
