// src/components/profile/UserProfile.tsx
import { useEffect, useState } from "react";
import api from "../../api/axiosInstance";  // 설정한 axios 인스턴스 사용
import { Button } from '../ui/button'

export function UserProfile() {
  const [user, setUser] = useState({ name: "", points: 0, contribution: 0 });

  useEffect(() => {
    api.get("/user")
      .then(res => {
        console.log("API 응답 데이터:", res.data);  // 콘솔 로그 추가
        setUser(res.data);
      })
      .catch(err => console.error("API 요청 오류:", err));
  }, []);

  return (
    <div className="flex flex-col md:flex-row items-start md:items-center gap-4 p-4 rounded-lg bg-white shadow-sm">
      <div className="flex items-center gap-4">
        <div className="h-24 w-24 rounded-full bg-gray-200 animate-pulse"></div>
        <div>
          <h2 className="text-xl font-bold">{user.name || "이름 없음"}</h2>
          <p className="text-gray-500">누적 포인트: {user.points || 0} 총량 기여: {user.contribution || 0}kg CO2 절감</p>
          <p className="text-gray-500">환경을 위한 친환경 분리배출을 시작하세요.</p>
        </div>
      </div>
      <div className="mt-4 md:mt-0 md:ml-auto space-y-2 md:space-y-0 md:space-x-2 w-full md:w-auto">
        <Button variant="outline" className="w-full md:w-auto">
          포인트 및 리워드
        </Button>
        <Button className="w-full md:w-auto bg-black text-white hover:bg-black/90">
          분리배출 시작
        </Button>
      </div>
    </div>
  )
}
