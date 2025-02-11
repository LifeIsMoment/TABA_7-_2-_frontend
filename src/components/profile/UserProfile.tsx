import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "@/lib/firebase/firebase";
import { doc, getDoc } from "firebase/firestore";
import { Button } from "@/components/ui/button";
import { Timestamp } from "firebase/firestore";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Loader2 } from "lucide-react";

interface UserData {
  username?: string;
  name?: string;
  email: string;
  photoURL?: string;
  createdAt?: Timestamp;
  lastLogin?: Timestamp;
  provider?: string;
}

export function UserProfile() {
  const navigate = useNavigate();
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const currentUser = auth.currentUser;
        const localUser = localStorage.getItem("user");

        if (currentUser) {
          const userDocRef = doc(db, "users", currentUser.uid);
          const userDoc = await getDoc(userDocRef);

          if (userDoc.exists()) {
            const userData = userDoc.data() as UserData;
            // 구글 로그인 사용자의 경우 추가 정보 설정
            if (currentUser.providerData[0]?.providerId === "google.com") {
              userData.provider = "google";
              userData.photoURL = currentUser.photoURL || userData.photoURL;
              userData.name = currentUser.displayName || userData.name;
            }
            setUser(userData);
          } else if (localUser) {
            // localStorage에서 사용자 정보 가져오기
            const localUserData = JSON.parse(localUser);
            setUser(localUserData);
          } else {
            setError("사용자 정보를 찾을 수 없습니다.");
          }
        } else {
          setError("로그인된 사용자가 없습니다.");
        }
      } catch (err) {
        console.error("❌ 사용자 정보 가져오기 실패:", err);
        setError("데이터를 불러오는 중 오류가 발생했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-32">
        <Loader2 className="w-8 h-8 animate-spin text-gray-500" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 text-red-600 p-4 rounded-lg">
        {error}
      </div>
    );
  }

  if (!user) return null;

  const createdAt = user.createdAt instanceof Timestamp
    ? user.createdAt.toDate().toLocaleDateString()
    : new Date().toLocaleDateString();

  const lastLogin = user.lastLogin instanceof Timestamp
    ? user.lastLogin.toDate().toLocaleDateString()
    : new Date().toLocaleDateString();

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex items-start gap-6">
        <Avatar className="w-20 h-20">
          <AvatarImage 
            src={user.photoURL || undefined} 
            alt={user.name || user.username || "사용자"} 
          />
          <AvatarFallback className="bg-gray-200 text-gray-600 text-xl">
            {(user.name || user.username || "U")[0].toUpperCase()}
          </AvatarFallback>
        </Avatar>

        <div className="flex-1">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-xl font-bold flex items-center gap-2">
                {user.name || user.username || "사용자"}
                {user.provider === "google" && (
                  <img 
                    src="/google-icon.svg" 
                    alt="Google" 
                    className="w-4 h-4" 
                  />
                )}
              </h2>
              <p className="text-gray-500 text-sm">{user.email}</p>
            </div>
            <Button 
              className="bg-green-600 hover:bg-green-700 text-white"
              onClick={() => navigate("/waste-analysis")}
            >
              분리배출 시작
            </Button>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-4 text-sm text-gray-600">
            <div>
              <p>가입일: {createdAt}</p>
              <p>최근 로그인: {lastLogin}</p>
            </div>
            <div className="text-right">
              {/* 추가 통계나 정보를 표시할 수 있습니다 */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;